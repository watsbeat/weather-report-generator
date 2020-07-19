"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCors = void 0;
exports.apiCors = (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    });
    next();
};
