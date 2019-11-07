import 'dotenv/config';
import express from 'express';
import routes from './API/routes/routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((err, req, res) => {
  res.status(500).send({ status: 'error', error: 'Internal Server Error' });
});

app.listen(port, () => console.log(`App listening on port ${port}....`));

export default app;
