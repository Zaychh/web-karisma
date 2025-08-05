// controllers/paymentController.js
const midtransClient = require('midtrans-client');

// Inisialisasi Midtrans
const snap = new midtransClient.Snap({
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Fungsi untuk create payment
const createPayment = async (req, res) => {
    try {
        const { program_id, full_name, email, phone, program_name, price } = req.body;
        
        // Ambil user_id dari JWT token (dari middleware auth)
        const user_id = req.user?.user_id;
        
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        // Validasi input
        if (!program_id || !full_name || !email || !phone || !program_name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Generate unique order ID
        const orderId = `KA-${user_id}-${program_id}-${Date.now()}`;
        
        // Parameter untuk Midtrans
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: parseInt(price)
            },
            customer_details: {
                first_name: full_name,
                email: email,
                phone: phone
            },
            item_details: [
                {
                    id: `program-${program_id}`,
                    price: parseInt(price),
                    quantity: 1,
                    name: program_name
                }
            ],
            callbacks: {
                finish: `${process.env.FRONTEND_URL}/payment/success`
            }
        };

        // Create transaction dengan Midtrans
        const transaction = await snap.createTransaction(parameter);
        
        // Simpan ke database dengan status pending
        const insertQuery = `
            INSERT INTO transactions 
            (user_id, program_id, order_id, transaction_status, payment_type, gross_amount, 
             transaction_time, snap_token, full_name, email, phone, program_name, 
             midtrans_order_id, created_at, updated_at) 
            VALUES (?, ?, ?, 'pending', 'midtrans', ?, NOW(), ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        
        const [result] = await global.db.execute(insertQuery, [
            user_id, 
            program_id, 
            orderId, 
            parseInt(price), 
            transaction.token, 
            full_name, 
            email, 
            phone, 
            program_name, 
            orderId
        ]);

        // Create enrollment record with pending status
        const enrollmentQuery = `
            INSERT INTO enrollments 
            (user_id, program_id, transaction_id, status, enrolled_at, created_at, updated_at)
            VALUES (?, ?, ?, 'pending', NOW(), NOW(), NOW())
        `;
        
        await global.db.execute(enrollmentQuery, [
            user_id,
            program_id,
            result.insertId
        ]);
        
        console.log(`✅ Payment created for user ${user_id}, order ${orderId}`);
        
        res.json({
            success: true,
            message: 'Payment created successfully',
            data: {
                token: transaction.token,
                redirect_url: transaction.redirect_url,
                order_id: orderId,
                transaction_id: result.insertId
            }
        });
        
    } catch (error) {
        console.error('❌ Payment creation error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to create payment',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Fungsi untuk handle notification dari Midtrans
const handleNotification = async (req, res) => {
    try {
        const notification = req.body;
        console.log('🔔 Received notification:', notification);
        
        // Verifikasi notification dari Midtrans
        const statusResponse = await snap.transaction.notification(notification);
        
        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;
        
        console.log(`📊 Transaction notification: Order ID: ${orderId}, Status: ${transactionStatus}, Fraud: ${fraudStatus}`);
        
        // Tentukan status berdasarkan response Midtrans
        let status = 'pending';
        
        if (transactionStatus == 'capture') {
            if (fraudStatus == 'challenge') {
                status = 'pending';
            } else if (fraudStatus == 'accept') {
                status = 'success';
            }
        } else if (transactionStatus == 'settlement') {
            status = 'success';
        } else if (transactionStatus == 'cancel' || 
                   transactionStatus == 'deny' || 
                   transactionStatus == 'expire') {
            status = 'failed';
        } else if (transactionStatus == 'pending') {
            status = 'pending';
        }
        
        // Update status di database
        const updateQuery = `
            UPDATE transactions 
            SET transaction_status = ?, 
                midtrans_transaction_id = ?,
                payment_method = ?,
                payment_url = ?,
                updated_at = NOW()
            WHERE midtrans_order_id = ?
        `;
        
        await global.db.execute(updateQuery, [
            status, 
            statusResponse.transaction_id || null, 
            statusResponse.payment_type || null,
            statusResponse.payment_url || null,
            orderId
        ]);
        
        // Jika payment berhasil, update enrollment
        if (status === 'success') {
            try {
                // Ambil transaction info
                const [transactionResult] = await global.db.execute(
                    'SELECT id, user_id, program_id FROM transactions WHERE midtrans_order_id = ?', 
                    [orderId]
                );
                
                if (transactionResult.length > 0) {
                    const transaction = transactionResult[0];
                    
                    // Update enrollment status jadi active
                    const enrollmentUpdateQuery = `
                        UPDATE enrollments 
                        SET status = 'active', updated_at = NOW()
                        WHERE user_id = ? AND program_id = ? AND transaction_id = ?
                    `;
                    
                    await global.db.execute(enrollmentUpdateQuery, [
                        transaction.user_id, 
                        transaction.program_id, 
                        transaction.id
                    ]);
                    
                    console.log(`✅ Enrollment activated for user ${transaction.user_id}, program ${transaction.program_id}`);
                }
            } catch (enrollmentError) {
                console.error('❌ Error updating enrollment:', enrollmentError);
                // Tetap return success karena payment sudah berhasil
            }
        } else if (status === 'failed') {
            // Update enrollment ke failed juga
            try {
                const [transactionResult] = await global.db.execute(
                    'SELECT id, user_id, program_id FROM transactions WHERE midtrans_order_id = ?', 
                    [orderId]
                );
                
                if (transactionResult.length > 0) {
                    const transaction = transactionResult[0];
                    
                    const enrollmentUpdateQuery = `
                        UPDATE enrollments 
                        SET status = 'expired', updated_at = NOW()
                        WHERE user_id = ? AND program_id = ? AND transaction_id = ?
                    `;
                    
                    await global.db.execute(enrollmentUpdateQuery, [
                        transaction.user_id, 
                        transaction.program_id, 
                        transaction.id
                    ]);
                    
                    console.log(`❌ Enrollment marked as expired for user ${transaction.user_id}, program ${transaction.program_id}`);
                }
            } catch (enrollmentError) {
                console.error('❌ Error updating enrollment to failed:', enrollmentError);
            }
        }
        
        console.log(`✅ Transaction ${orderId} updated to ${status}`);
        res.json({ status: 'OK' });
        
    } catch (error) {
        console.error('❌ Notification handling error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to handle notification',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Fungsi untuk check payment status
const checkPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const user_id = req.user?.user_id;
        
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        
        // Query ke database untuk cek status (dengan filter user_id untuk security)
        const query = `
            SELECT t.*, e.status as enrollment_status
            FROM transactions t
            LEFT JOIN enrollments e ON t.id = e.transaction_id
            WHERE t.midtrans_order_id = ? AND t.user_id = ?
        `;
        
        const [result] = await global.db.execute(query, [orderId, user_id]);
        
        if (result.length > 0) {
            res.json({
                success: true,
                data: result[0]
            });
        } else {
            res.status(404).json({ 
                success: false,
                message: 'Transaction not found'
            });
        }
        
    } catch (error) {
        console.error('❌ Check payment status error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to check payment status',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// Fungsi untuk get user transactions
const getUserTransactions = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        
        if (!user_id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }
        
        const query = `
            SELECT t.*, p.title as program_title, p.image_cover as program_image
            FROM transactions t
            LEFT JOIN program p ON t.program_id = p.program_id
            WHERE t.user_id = ?
            ORDER BY t.created_at DESC
        `;
        
        const [result] = await global.db.execute(query, [user_id]);
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('❌ Get user transactions error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to get transactions',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

module.exports = {
    createPayment,
    handleNotification,
    checkPaymentStatus,
    getUserTransactions
};