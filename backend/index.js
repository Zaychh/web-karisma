// index.js - CORS Configuration Fix

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { createPool } = require('./database');
const { router: authRoutes } = require('./routes/auth');
const instructorRoutes = require('./routes/instructor');
const programRoutes = require('./routes/program');
const userRoutes = require('./routes/user');
const toolsRoutes = require('./routes/tools');
const achievementRoutes = require('./routes/achievement');
const quizRoutes = require('./routes/quiz');
const paymentRoutes = require('./routes/payment');

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// ✅ ENHANCED CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174', 
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// ✅ Middleware dalam urutan yang benar
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Debug middleware untuk track semua request
app.use((req, res, next) => {
    console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📄 Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

// ✅ Routes setelah middleware
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/program', programRoutes);
// Serve folder uploads/cover di URL /uploads/cover
app.use("/uploads/cover", express.static(path.join(__dirname, "uploads/cover")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/user', userRoutes);   // untuk route: /me, /update, /my-programs, dll
app.use('/api/users', userRoutes);  // untuk admin: /users, /users/1, dll
app.use('/api/tools', toolsRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/quiz', quizRoutes); // ✅ Quiz routes
app.use('/api', paymentRoutes);

// ✅ Enhanced Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server berjalan dengan baik!',
        database: global.db ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ✅ Enhanced 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requested: `${req.method} ${req.url}`,
        timestamp: new Date().toISOString()
    });
});

// ✅ Enhanced Error handler
app.use((error, req, res, next) => {
    console.error('❌ Server Error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        timestamp: new Date().toISOString()
    });
});

const createDefaultAdmin = async () => {
    try {
        const [existingAdmin] = await global.db.execute(
            'SELECT user_id FROM users WHERE name = ? OR email = ?',
            ['Administrator', 'admin@mail.com']
        );

        if (existingAdmin.length === 0) {
            console.log('🔄 Creating default admin user...');
            
            const hashedPassword = await bcrypt.hash('adminn123', 10);
            
            await global.db.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                ['Administrator', 'admin@mail.com', hashedPassword, 'admin']
            );

            console.log('✅ Default admin created successfully!');
            console.log('📝 Login credentials: Administrator / adminn123');
        } else {
            console.log('✅ Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating default admin:', error);
    }
};

// Start server dengan database connection
const startServer = async () => {
    try {
        // Inisialisasi database connection pool
        console.log('🔄 Initializing Database Connection...Please Wait');
        global.db = await createPool();
        console.log('✅ Database connected successfully');
        
        // Test database connection
        const [rows] = await global.db.execute('SELECT 1 as test');
        console.log('✅ Database test query successful:', rows);
        
        // Create default admin
        await createDefaultAdmin();
        
        // Start server setelah database terhubung
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Server online at http://localhost:${PORT}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/health`);
            console.log(`🔗 Quiz health: http://localhost:${PORT}/api/quiz/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 Received SIGTERM. Shutting down gracefully...');
    if (global.db) {
        await global.db.end();
        console.log('✅ Database connection closed.');
    }
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 Received SIGINT. Shutting down gracefully...');
    if (global.db) {
        await global.db.end();
        console.log('✅ Database connection closed.');
    }
    process.exit(0);
});

startServer();