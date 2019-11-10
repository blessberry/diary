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

      return res.status(201).json({ status: 'success', data: entry.rows[0] });
    } catch (error) {
      res.status(500).json({ data: error });
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { Email: email } = req.user;
      const entries = await pool.query(db.read(email));
  
      if (entries.rowCount < 0) return res.status(404).send({ status: 'error', data: 'NO ENTRIES' });
  
      res.status(200).send({
        status: 'success',
        data: entries.rows,
      });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }

  },
  pick: async (req, res, next) => {
    try {
      const { Email: email } = req.user;
      const { id } = req.params;
      const entry = await pool.query(db.pick(email, id));
  
      if (entry.rowCount > 0) res.status(200).json({ status: 'success', data: entry.rows[0] });
  
      res.status(404).json({ status: 'error', message: 'NO ENTRY' });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  },
  patch: async (req, res, next) => {
    try {
      const { Email: email } = req.user;
      const { id } = req.params;
      const entry = await pool.query(db.pick(email, id));
  
      if (entry.rowCount === 0) return res.status(404).json({ status: 'error', data: 'ENTRY NOT FOUND' });
      const update = await pool.query(db.update(req.body.title, req.body.description, email, id));
  
      return res.status(200).json({ status: 'success', data: update.rows[0] });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { Email: email } = req.user;
      const { id } = req.params;
      const entry = await pool.query(db.delete(email, id));

      if (entry.rowCount > 0) return res.status(200).json({ status: 200, message: '​ENTRY DELETED' });

      return res.status(404).json({ status: 404, message: 'NOT FOUND' });
    } catch (error) {
      res.status(500).json({ message: error });
      next(error);
    }
  }
}