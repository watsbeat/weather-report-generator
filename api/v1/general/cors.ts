import { RequestHandler } from 'express';

export const apiCors: RequestHandler = (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    });
    next();
};
