const fs = require('fs');
const yaml = require('yaml');

const DEFAULT_FORM_DATA = require('./lib/default-form-data');

const { generateWordSearch } = require('./lib/call-service');
const { prepareHTML } = require('./lib/clean-html');

async function runApp() {
  const wordSchemaString = fs.readFileSync('./schemas/animals.yml', 'utf8');
  const wordSchema = yaml.parse(wordSchemaString);

  const CUSTOM_FORM_DATA = {
    puzzleTitle: wordSchema.title,
    inputWords: wordSchema.words.join(','),
  };

  const THE_FORM_DATA = { ...DEFAULT_FORM_DATA, ...CUSTOM_FORM_DATA };

  const response = await generateWordSearch(THE_FORM_DATA);
  const theHTML = prepareHTML(response);

  fs.mkdirSync('generated', { recursive: true });
  fs.writeFileSync('./generated/animals.html', theHTML);
}

runApp();
