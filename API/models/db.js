import pool from '../helpers/pg';

const tables = ` DROP TABLE IF EXISTS users, entries;
                  CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                      firstName VARCHAR (255) NOT NULL,
                        lastName VARCHAR (255) NOT NULL,
                          email VARCHAR (100) NOT NULL,
                    password VARCHAR (255) NOT NULL
  );
CREATE TABLE IF NOT EXISTS entries (
  id SERIAL PRIMARY KEY,
  email VARCHAR (100) NOT NULL,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  createdOn VARCHAR NOT NULL
);
 `;
pool.query(tables).then(() => {
  pool.end();
}).catch((err) => {
  process.stdout.write(err.message);
  process.exit(0);
});

process.stdout.write('Tables created ');
