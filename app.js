import 'dotenv/config';
import express from 'express';
import routes from './API/routes/routes';
import responses from './API/helpers/responses';

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

app.use(responses['err']);

app.listen(port, () => console.log(`App listening on port ${port}!`));

export default app;