const fs = require('fs');
const path = require('path');
const utils = require('util');
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const readFile = utils.promisify(fs.readFile);

async function getTemplateHtml() {
    console.log('Loading template file in memory');
    try {
        const reportPath = path.resolve('./templates/report.html');
        return await readFile(reportPath, 'utf8');
    } catch (err) {
        console.error(err);
        return Promise.reject('Could not load html template');
    }
}

export async function generatePdf() {
    let data = {};

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
