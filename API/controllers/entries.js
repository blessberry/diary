import pool from '../helpers/pg';
import db from '../models/helpers/queries';

export default {
  post: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { Email: email } = req.user;
      const entry = await pool.query(
        db.save(email, title, description, new Date().toLocaleString()),
      );

      res.status(201).json({ status: 'success', message: 'entry successfully created', data: entry.rows[0] });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  },
  get: async (req, res) => {
    const { Email: email } = req.user;
    const entries = await pool.query(db.read(email));

    if (entries.rowCount < 0) { res.status(404).send({ status: 'error', message: 'you have no entries!' }); }

    res.status(200).send({
      status: 'success',
      message: entries.rows,
    });
  },
  pick: async (req, res) => {
    const { Email: email } = req.user;
    const { id } = req.params;
    const entry = await pool.query(db.pick(email, id));

    if (entry.rowCount > 0) { res.status(200).json({ status: 'success', data: entry.rows[0] }); }

    res.status(404).json({ status: 'error', message: 'No entry to display' });
  },
  patch: async (req, res) => {
    const { Email: email } = req.user;
    const { id } = req.params;
    const entry = await pool.query(db.pick(email, id));

    if (entry.rowCount === 0) res.status(404).json({ status: 'error', message: 'entry not found' });

    if (!req.body.title && !req.body.description) res.status(400).json({ status: 'error', message: 'please update either title or description!' });

    if (!req.body.title) { req.body.title = entry.rows[0].title; }

    if (!req.body.description) req.body.title = entry.rows[0].description;

    const update = await pool.query(db.pick(req.body.title, req.body.description, email, id));

    res.status(200).json({ message: 'entry successful updated', data: update.rows[0] });
  },
  delete: async (req, res) => {
    const { Email: email } = req.user;
    const { id } = req.params;
    const entry = await pool.query(db.delete(email, id));


    if (entry.rowCount > 0) { res.status(200).json({ status: 200, message: '​entry successfully deleted' }); }

    res.status(404).json({ status: 404, message: 'entry not found' });
  },
};
