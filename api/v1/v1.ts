import { Router } from 'express';
import { apiCors } from './general/cors';
import { logger } from './general/logging';

export let routerV1 = Router();

routerV1.use(logger);

routerV1.use(apiCors);

routerV1.get('/', (req, res, next) => {
    res.send('Reports API');
});
