// controllers/quizController.js - FIXED VERSION (Error Fix)

const quizController = {
    // Create new quiz with soal and jawaban - FIXED
    createQuiz: async (req, res) => {
        try {
            console.log('📥 Received quiz data:', req.body);

            const { 
                id_sesi, 
                pertanyaan, 
                jawaban_1, 
                jawaban_2, 
                jawaban_3, 
                jawaban_4, 
                jawaban_benar 
            } = req.body;

            // Enhanced validation
            if (!id_sesi || !pertanyaan || !jawaban_1 || !jawaban_2 || !jawaban_3 || !jawaban_4 || !jawaban_benar) {
                console.log('❌ Validation failed - missing fields');
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required',
                    received: {
                        id_sesi: !!id_sesi,
                        pertanyaan: !!pertanyaan,
                        jawaban_1: !!jawaban_1,
                        jawaban_2: !!jawaban_2,
                        jawaban_3: !!jawaban_3,
                        jawaban_4: !!jawaban_4,
                        jawaban_benar: !!jawaban_benar
                    }
                });
            }

            const jawabanBenarInt = parseInt(jawaban_benar);
            if (![1, 2, 3, 4].includes(jawabanBenarInt)) {
                console.log('❌ Invalid jawaban_benar:', jawaban_benar);
                return res.status(400).json({
                    success: false,
                    message: 'jawaban_benar must be between 1-4'
                });
            }

            // Check if database connection exists
            if (!global.db) {
                console.log('❌ Database connection not found');
                return res.status(500).json({
                    success: false,
                    message: 'Database connection error'
                });
            }

            // Check if sesi exists first
            console.log('🔍 Checking if sesi exists:', id_sesi);
            const [sesiCheck] = await global.db.execute('SELECT id FROM sesi WHERE id = ?', [id_sesi]);
            if (!sesiCheck || sesiCheck.length === 0) {
                console.log('❌ Sesi not found:', id_sesi);
                return res.status(404).json({
                    success: false,
                    message: 'Sesi tidak ditemukan'
                });
            }

            // Check if sesi already has quiz (1 sesi = 1 quiz)
            console.log('🔍 Checking existing quiz for sesi:', id_sesi);
            const [existingQuiz] = await global.db.execute('SELECT id FROM quiz WHERE id_sesi = ?', [id_sesi]);
            if (existingQuiz && existingQuiz.length > 0) {
                console.log('❌ Sesi already has quiz:', id_sesi);
                return res.status(400).json({
                    success: false,
                    message: 'Sesi ini sudah memiliki quiz'
                });
            }

            // Start transaction - FIXED: Use query() instead of execute() for transaction commands
            console.log('🔄 Starting transaction...');
            await global.db.query('START TRANSACTION');

            try {
                // 1. Insert soal first
                console.log('📝 Inserting soal...');
                const [soalResult] = await global.db.execute(
                    'INSERT INTO soal (soal) VALUES (?)', 
                    [pertanyaan]
                );
                const soalId = soalResult.insertId;
                console.log('✅ Soal inserted with ID:', soalId);

                // 2. Insert quiz
                console.log('📝 Inserting quiz...');
                const [quizResult] = await global.db.execute(
                    'INSERT INTO quiz (id_sesi, id_soal) VALUES (?, ?)', 
                    [id_sesi, soalId]
                );
                const quizId = quizResult.insertId;
                console.log('✅ Quiz inserted with ID:', quizId);

                // 3. Insert 4 jawaban
                console.log('📝 Inserting jawaban...');
                const jawaban = [jawaban_1, jawaban_2, jawaban_3, jawaban_4];
                
                for (let i = 0; i < jawaban.length; i++) {
                    const isBenar = (i + 1) === jawabanBenarInt;
                    await global.db.execute(
                        'INSERT INTO jawaban (jawaban, benar, id_soal) VALUES (?, ?, ?)', 
                        [jawaban[i], isBenar ? 1 : 0, soalId]
                    );
                    console.log(`✅ Jawaban ${i + 1} inserted:`, jawaban[i], isBenar ? '(BENAR)' : '');
                }

                // Commit transaction - FIXED: Use query() instead of execute()
                await global.db.query('COMMIT');
                console.log('✅ Transaction committed successfully');

                res.status(201).json({
                    success: true,
                    message: 'Quiz created successfully',
                    data: {
                        quiz_id: quizId,
                        soal_id: soalId
                    }
                });

            } catch (transactionError) {
                // Rollback transaction - FIXED: Use query() instead of execute()
                await global.db.query('ROLLBACK');
                console.error('❌ Transaction error, rolled back:', transactionError);
                throw transactionError;
            }

        } catch (error) {
            console.error('❌ Error creating quiz:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating quiz: ' + error.message,
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    },

    // Get all quizzes
    getAllQuizzes: async (req, res) => {
        try {
            const [quizzes] = await global.db.execute(`
                SELECT q.*, s.judul_sesi 
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                ORDER BY q.id DESC
            `);
            
            res.status(200).json({
                success: true,
                data: quizzes
            });
        } catch (error) {
            console.error('Error getting quizzes:', error);
            res.status(500).json({
                success: false,
                message: 'Error getting quizzes'
            });
        }
    },

    // Get quiz by ID with soal and jawaban
    getQuizById: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Get quiz info
            const [quiz] = await global.db.execute(`
                SELECT q.*, s.judul_sesi 
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                WHERE q.id = ?
            `, [id]);
            
            if (!quiz.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }

            // Get soal for this quiz
            const [soal] = await global.db.execute(`SELECT * FROM soal WHERE id = ?`, [quiz[0].id_soal]);

            // Get jawaban for this soal
            const [jawaban] = await global.db.execute(`SELECT * FROM jawaban WHERE id_soal = ? ORDER BY id`, [soal[0]?.id]);

            res.status(200).json({
                success: true,
                data: {
                    quiz: quiz[0],
                    soal: soal[0],
                    jawaban: jawaban
                }
            });
        } catch (error) {
            console.error('Error getting quiz by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Error getting quiz'
            });
        }
    },

    // Update quiz - FIXED TRANSACTION
    updateQuiz: async (req, res) => {
        try {
            const { id } = req.params;
            const { 
                pertanyaan, 
                jawaban_1, 
                jawaban_2, 
                jawaban_3, 
                jawaban_4, 
                jawaban_benar 
            } = req.body;

            // Get current quiz
            const [currentQuiz] = await global.db.execute('SELECT * FROM quiz WHERE id = ?', [id]);
            if (!currentQuiz.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }

            const soalId = currentQuiz[0].id_soal;

            // Start transaction - FIXED
            await global.db.query('START TRANSACTION');

            try {
                // 1. Update soal
                if (pertanyaan) {
                    await global.db.execute('UPDATE soal SET soal = ? WHERE id = ?', [pertanyaan, soalId]);
                }

                // 2. Update jawaban
                if (jawaban_1 || jawaban_2 || jawaban_3 || jawaban_4 || jawaban_benar) {
                    const [currentJawaban] = await global.db.execute('SELECT * FROM jawaban WHERE id_soal = ? ORDER BY id', [soalId]);
                    
                    const jawaban = [jawaban_1, jawaban_2, jawaban_3, jawaban_4];
                    
                    for (let i = 0; i < currentJawaban.length && i < jawaban.length; i++) {
                        if (jawaban[i]) {
                            const isBenar = jawaban_benar ? (i + 1) === parseInt(jawaban_benar) : currentJawaban[i].benar;
                            await global.db.execute(
                                'UPDATE jawaban SET jawaban = ?, benar = ? WHERE id = ?', 
                                [jawaban[i], isBenar ? 1 : 0, currentJawaban[i].id]
                            );
                        }
                    }
                }

                // Commit transaction - FIXED
                await global.db.query('COMMIT');

                res.status(200).json({
                    success: true,
                    message: 'Quiz updated successfully'
                });

            } catch (transactionError) {
                // Rollback transaction - FIXED
                await global.db.query('ROLLBACK');
                throw transactionError;
            }

        } catch (error) {
            console.error('Error updating quiz:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating quiz'
            });
        }
    },

    // Delete quiz - FIXED TRANSACTION
    deleteQuiz: async (req, res) => {
        try {
            const { id } = req.params;

            // Get quiz to get soal_id
            const [quiz] = await global.db.execute('SELECT * FROM quiz WHERE id = ?', [id]);
            if (!quiz.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }

            const soalId = quiz[0].id_soal;

            // Start transaction - FIXED
            await global.db.query('START TRANSACTION');

            try {
                // Delete in order: jawaban -> quiz -> soal
                await global.db.execute('DELETE FROM jawaban WHERE id_soal = ?', [soalId]);
                await global.db.execute('DELETE FROM quiz WHERE id = ?', [id]);
                await global.db.execute('DELETE FROM soal WHERE id = ?', [soalId]);

                // Commit transaction - FIXED
                await global.db.query('COMMIT');

                res.status(200).json({
                    success: true,
                    message: 'Quiz deleted successfully'
                });

            } catch (transactionError) {
                // Rollback transaction - FIXED
                await global.db.query('ROLLBACK');
                throw transactionError;
            }

        } catch (error) {
            console.error('Error deleting quiz:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting quiz'
            });
        }
    },

    // Get quiz for student (without showing correct answer)
    getQuizForStudent: async (req, res) => {
        try {
            const { id } = req.params;
            
            const [quiz] = await global.db.execute(`
                SELECT q.*, s.judul_sesi, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE q.id = ?
            `, [id]);
            
            if (!quiz.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }

            // Get jawaban without showing which one is correct
            const [jawaban] = await global.db.execute(`SELECT id, jawaban FROM jawaban WHERE id_soal = ? ORDER BY id`, [quiz[0].id_soal]);

            res.status(200).json({
                success: true,
                data: {
                    quiz: quiz[0],
                    jawaban: jawaban
                }
            });
        } catch (error) {
            console.error('Error getting quiz for student:', error);
            res.status(500).json({
                success: false,
                message: 'Error getting quiz'
            });
        }
    },

    // Submit quiz answer
    submitQuizAnswer: async (req, res) => {
        try {
            const { quiz_id, jawaban_id } = req.body;

            if (!quiz_id || !jawaban_id) {
                return res.status(400).json({
                    success: false,
                    message: 'quiz_id and jawaban_id are required'
                });
            }

            // Check if answer is correct
            const [result] = await global.db.execute(`
                SELECT j.benar, j.jawaban, so.soal
                FROM jawaban j
                JOIN soal so ON j.id_soal = so.id
                JOIN quiz q ON q.id_soal = so.id
                WHERE j.id = ? AND q.id = ?
            `, [jawaban_id, quiz_id]);

            if (!result.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid quiz or answer'
                });
            }

            const isCorrect = result[0].benar === 1;

            res.status(200).json({
                success: true,
                data: {
                    is_correct: isCorrect,
                    selected_answer: result[0].jawaban,
                    question: result[0].soal
                }
            });

        } catch (error) {
            console.error('Error submitting quiz answer:', error);
            res.status(500).json({
                success: false,
                message: 'Error submitting answer'
            });
        }
    },

    // Get quizzes by program ID
    getQuizzesByProgram: async (req, res) => {
        try {
            const { program_id } = req.params;
            
            const [quizzes] = await global.db.execute(`
                SELECT q.*, s.judul_sesi, s.topik, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE s.id_program = ?
                ORDER BY s.id, q.id
            `, [program_id]);
            
            res.status(200).json({
                success: true,
                data: quizzes
            });
        } catch (error) {
            console.error('Error getting quizzes by program:', error);
            res.status(500).json({
                success: false,
                message: 'Error getting quizzes'
            });
        }
    },

    // Get quizzes by sesi ID
    getQuizzesBySesi: async (req, res) => {
        try {
            const { sesi_id } = req.params;
            
            const [quizzes] = await global.db.execute(`
                SELECT q.*, s.judul_sesi, s.topik, so.soal
                FROM quiz q
                JOIN sesi s ON q.id_sesi = s.id
                JOIN soal so ON q.id_soal = so.id
                WHERE q.id_sesi = ?
                ORDER BY q.id
            `, [sesi_id]);
            
            res.status(200).json({
                success: true,
                data: quizzes
            });
        } catch (error) {
            console.error('Error getting quizzes by sesi:', error);
            res.status(500).json({
                success: false,
                message: 'Error getting quizzes'
            });
        }
    },

    // Check if sesi already has quiz
    checkSesiQuiz: async (req, res) => {
        try {
            const { sesi_id } = req.params;
            
            const [result] = await global.db.execute(`SELECT COUNT(*) as count FROM quiz WHERE id_sesi = ?`, [sesi_id]);
            
            res.status(200).json({
                success: true,
                data: {
                    has_quiz: result[0].count > 0,
                    quiz_count: result[0].count
                }
            });
        } catch (error) {
            console.error('Error checking sesi quiz:', error);
            res.status(500).json({
                success: false,
                message: 'Error checking quiz'
            });
        }
    }
};

module.exports = quizController;