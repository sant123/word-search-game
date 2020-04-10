#!/usr/bin/env node

const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const open = require('open');

const DEFAULT_FORM_DATA = require('./lib/default-form-data');

const { getSchema } = require('./lib/cli');
const { generateWordSearch } = require('./lib/call-service');
const { prepareHTML } = require('./lib/clean-html');

async function runApp() {
  const schema = await getSchema();
  const generated = schema.replace('.yml', '.html');

  const schemaPath = path.join(__dirname, './schemas', schema);
  const generatedPath = path.join(__dirname, './generated', generated);

  const wordSchemaString = fs.readFileSync(schemaPath, 'utf8');
  const wordSchema = yaml.parse(wordSchemaString);

  const CUSTOM_FORM_DATA = {
    puzzleTitle: wordSchema.title,
    inputWords: wordSchema.words.join(','),
  };

  const THE_FORM_DATA = { ...DEFAULT_FORM_DATA, ...CUSTOM_FORM_DATA };

  const response = await generateWordSearch(THE_FORM_DATA);
  const theHTML = prepareHTML(response);

  const generatedFolder = path.join(__dirname, 'generated');

  fs.mkdirSync(generatedFolder, { recursive: true });
  fs.writeFileSync(generatedPath, theHTML);

  await open(generatedPath);
}

runApp();
