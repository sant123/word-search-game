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
  const { schema, schemaFolder } = await getSchema();

  const schemaFilePath = path.join(schemaFolder, schema);

  const generatedFolder = path.join(schemaFolder, 'generated');
  const generatedFilePath = path.join(generatedFolder, schema.replace('.yml', '.html'));

  const wordSchemaString = fs.readFileSync(schemaFilePath, 'utf8');
  const wordSchema = yaml.parse(wordSchemaString);

  const CUSTOM_FORM_DATA = {
    puzzleTitle: wordSchema.title,
    inputWords: wordSchema.words.join(','),
  };

  const THE_FORM_DATA = { ...DEFAULT_FORM_DATA, ...CUSTOM_FORM_DATA };

  const response = await generateWordSearch(THE_FORM_DATA);
  const theHTML = prepareHTML(response);

  fs.mkdirSync(generatedFolder, { recursive: true });
  fs.writeFileSync(generatedFilePath, theHTML);

  await open(generatedFilePath);
}

runApp();
