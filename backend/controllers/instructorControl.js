const { db } = require('../database');
const path = require('path');

exports.getInstructors = (req, res) => {
  db.query('SELECT * FROM instructor', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getInstructorById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM instructor WHERE instructor_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Instructor not found' });
    res.json(results[0]);
  });
};

console.log('[DEBUG] db object:', db);
exports.createInstructor = (req, res) => {
  const { name, email, mastery, status } = req.body;
  const image = req.file ? req.file.filename : null;

  if (status !== 'Active' && status !== 'Unactive') {
    return res.status(400).json({ error: 'Invalid status value'})
  }

  db.query(
    'INSERT INTO instructor (name, email, mastery, status, image) VALUES (?, ?, ?, ?, ?)',
    [name, email, mastery, status, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'Instructor created', id: result.insertId });
    }
  );
};

exports.updateInstructor = (req, res) => {
  const id = req.params.id;
  const { name, email, mastery, status } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql = `
    UPDATE instructor 
    SET name = ?, email = ?, mastery = ?, status = ?
  `;

  const params = [name, email, mastery, status];

  if (image) {
    sql += `, image = ?`;
    params.push(image);
  }

  sql += ` WHERE instructor_id = ?`;
  params.push(id);

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Instructor updated' });
  });
};

exports.deleteInstructor = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM instructor WHERE instructor_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Instructor deleted' });
  });
};

exports.getMasteryEnum = (req, res) => {
  const sql = `SHOW COLUMNS FROM instructor LIKE 'mastery'`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('[ERROR] Failed to fetch enum column:', err);
      return res.status(500).json({ error: err });
    }

    if (!results || results.length === 0) {
      console.warn('[WARN] mastery column not found');
      return res.status(404).json({ error: 'Mastery column not found' });
    }

    const enumStr = results[0].Type;

    console.log('[DEBUG] Enum String:', enumStr); // Example: "enum('Cyber Security','UI/UX Design')"

    const options = enumStr.match(/'([^']+)'/g).map(val => val.replace(/'/g, ""));

    res.json(options);
  });
};


