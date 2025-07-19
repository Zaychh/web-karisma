const { error } = require('console');
const path = require('path');

exports.getInstructors = async (req, res) => {
  const db = global.db;
  try {
    const [results] = await db.query('SELECT * FROM instructor');
    res.json(results);
  } catch (err) {
    console.error('[ERROR] getInstructors:', err);
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
};

exports.getInstructorById = async (req, res) => {
  const db = global.db;
  const id = req.params.id;
  try {
    const [results] = await db.query('SELECT * FROM instructor WHERE instructor_id = ?', [id]);
    if (results.length === 0) return res.status(404).json({ error: 'Instructor not found'});
    res.json(results[0]);
  } catch (err) {
    console.error('[ERROR] getInstructorById:', err);
    res.status(500).json({ error: 'Failed to fetch instructor'});
  }
};

exports.createInstructor = async (req, res) => {
  const db = global.db;
  const { name, email, mastery, status } = req.body;
  const image = req.file ? req.file.filename : null;

  if (status !== 'Active' && status !== 'Unactive') {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO instructor (name, email, mastery, status, image) VALUES (?, ?, ?, ?, ?)', [name, email, mastery, status, image]
    );
    res.status(201).json({ message: 'Instructor created', id: result.insertId });
  } catch (err) {
    console.error('[ERROR] createInstructor:', err);
    res.status(500).json({ error: 'Failed to create instructor'});
  }
};

exports.updateInstructor = async (req, res) => {
  const db = global.db;
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

  try {
    await db.query(sql, params);
    res.json({ message: 'Instructor updated'});
  } catch (err) {
    console.error('[ERROR] updateInstructor:', err);
    res.status(500).json({ error: 'Failed to update instructor'});
  }
};

exports.deleteInstructor = async (req, res) => {
  const db = global.db;
  const id = req.params.id;
  try {
    await db.query('DELETE FROM instructor WHERE instructor_id = ?', [id]);
    res.json({ message: 'Instructor Successfully deleted!'});
  } catch (err) {
    console.error('[ERROR] deleteInstructor:', err);
    res.status(500).json({ error: 'Failed to delete instructor' });
  }
};

exports.getMasteryEnum = async (req, res) => {
  const db = global.db;
  const sql = `SHOW COLUMNS FROM instructor LIKE 'mastery'`;

  try {
    const [results] = await db.query(sql);

    if (!results || results.length === 0) {
      console.warn('[WARN] mastery column not found');
      return res.status(404).json({ error: 'Mastery column not found'});
    }

    const enumStr = results[0].Type;
    console.log('[DEBUG] Enum String:', enumStr);

    const options = enumStr.match(/'([^']+)'/g).map(val => val.replace(/'/g, ''));
    res.json(options);
  } catch (err) {
    console.error('[ERROR] getMasteryEnum:', err);
    res.status(500).json({ error: 'Failed to fetch mastery enum' });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const [result] = await global.db.query('SELECT instructor_id, name FROM instructor WHERE status = "Active"');
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data instruktor' });
  }
};


