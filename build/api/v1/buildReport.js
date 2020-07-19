"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = void 0;
const fs = require('fs');
const path = require('path');
const utils = require('util');
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const readFile = utils.promisify(fs.readFile);
const axios = require('axios');
async function getCurrentWeather() {
    try {
        const url = 'http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=439d4b804bc8187953eb36d2a8c26a02';
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
async function getTemplateHtml() {
    console.log('Loading template file in memory');
    try {
        const reportPath = path.resolve('./templates/weather-report.html');
        return await readFile(reportPath, 'utf8');
    }
    catch (err) {
        console.error(err);
        return Promise.reject('Could not load html template');
    }
}
async function generatePdf() {
    const data = await getCurrentWeather();
    console.log('data:', data);
    getTemplateHtml()
        .then(async (res) => {
        console.log('Compiling the template with handlebars');
        const template = hb.compile(res, { strict: true });
        const result = template(data);
        const html = result;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: './templates/report.pdf', format: 'A4' });
        await browser.close();
        console.log('PDF Generated');
    })
        .catch((err) => {
        console.error(err);
    });
}
exports.generatePdf = generatePdf;
