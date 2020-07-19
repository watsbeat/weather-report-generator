"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerV1 = void 0;
const express_1 = require("express");
const cors_1 = require("./general/cors");
const logging_1 = require("./general/logging");
const buildReport_1 = require("./buildReport");
exports.routerV1 = express_1.Router();
exports.routerV1.use(logging_1.logger);
exports.routerV1.use(cors_1.apiCors);
exports.routerV1.get('/', (req, res, next) => {
    buildReport_1.generatePdf();
    res.send('Reports API');
});
