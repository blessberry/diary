export default {
  get: (email) => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),
  create: (firstName, lastName, email, password) => ({
    text: 'INSERT INTO users (firstName,lastName,email,password) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [firstName, lastName, email, password],
  }),
  save: (email, title, description, createdOn) => ({
    text: 'INSERT INTO entries (email,title,description,createdOn) VALUES ( $1, $2, $3, $4 ) RETURNING *',
    values: [email, title, description, createdOn],
  }),
  read: (email) => ({
    text: `SELECT e.* FROM entries e
          JOIN users u ON u.email = e.email
          WHERE u.email = $1 ORDER BY e.createdOn DESC`,
    values: [email],
  }),
  pick: (email, id) => ({
    text: `SELECT e.* from entries e
          JOIN users u ON u.email = e.email
          WHERE u.email = $1 AND e.id = $2`,
    values: [email, id],
  }),
  delete: (email, id) => ({
    text: 'DELETE FROM entries e WHERE e.email = $1 AND e.id = $2',
    values: [email, id],
  }),
  update: (title, description, email, id) => ({
    text: 'UPDATE entries SET title = $1, description = $2 WHERE email = $3 AND id = $4 RETURNING *',
    values: [title, description, email, id],
  }),
};
