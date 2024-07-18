/* eslint-env node, browser */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream } from 'node:fs';
import * as dotenv from 'dotenv';
import puppeteer from 'puppeteer-core';
import { ensureDirSync } from 'fs-extra';

import Debug from 'debug';

dotenv.config();

const log = Debug('create-pdf');
log.enabled = true;

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);

const version = process.env.npm_package_version;
const port = 4321; //process.env.npm_package_config_devPort

const TMP_FOLDER_PATH = join(__dirname, '..', '.pdf');
ensureDirSync(TMP_FOLDER_PATH);

const reportFilePath = join(TMP_FOLDER_PATH, `bf-2035__${version}.pdf`);
const queryString = '?debug=false&print=true';

const pdfConfig = {
  path: reportFilePath,
  width: '210mm',
  height: '297mm',
  printBackground: true,
  omitBackground: true,
  margin: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
  },
  timeout: 100000,
};

const pdfUrls = ['de/druckversion/'];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(100000);

  const url = pdfUrls[0];
  log(`fetching ${url}`);

  await page.goto(`http://localhost:${port}/${url}${queryString}`, {
    waitUntil: 'networkidle2',
  });

  log('initializing VuePagedJS');

  await page.keyboard.down('Shift');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyP');
  await page.keyboard.up('Shift');
  await page.keyboard.up('Control');

  log('waitFor .vue-paged-js[data-rendering-completed="true"]');

  await page.waitForSelector('.vue-paged-js[data-rendering-completed="true"]');

  log('saving pdf');

  const pdfStream = await page.createPDFStream(pdfConfig);
  const writeStream = createWriteStream(reportFilePath);
  pdfStream.pipe(writeStream);
  pdfStream.on('end', async () => {
    await browser.close();
  });
})();
