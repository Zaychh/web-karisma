const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET Routes
router.get('/', userController.getUsers);                    // GET /api/users - Ambil semua users (exclude admin)
router.get('/role-enum', userController.getRoleEnum);       // GET /api/users/role-enum - Return ['user'] saja
router.get('/role/:role', userController.getUsersByRole);   // GET /api/users/role/user - Hanya allow role 'user'
router.get('/:id', userController.getUserById);             // GET /api/users/1 - Ambil user berdasarkan ID (exclude admin)

// POST Routes
router.post('/', userController.createUser);                // POST /api/users - Buat user baru (hanya role 'user')

// PUT Routes
router.put('/:id', userController.updateUser);              // PUT /api/users/1 - Update user berdasarkan ID (exclude admin)

// DELETE Routes
router.delete('/:id', userController.deleteUser);           // DELETE /api/users/1 - Hapus user berdasarkan ID (exclude admin)

module.exports = router;
