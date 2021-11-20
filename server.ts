import express from 'express';
import { routerV1 } from './api/v1/v1';

const app = express();

app.disable('x-powered-by');

app.use('/v1', routerV1);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server started at port ${port}...`);
});
