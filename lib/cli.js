const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');

const ymlExtRegex = /\.yml$/;

function getSchemas() {
  fs.mkdirSync('schemas', { recursive: true });
  const filesInSchemas = fs.readdirSync('schemas');
  const schemas = filesInSchemas.filter((c) => ymlExtRegex.test(c));

  return schemas;
}

exports.getSchema = async function () {
  const schemas = getSchemas();

  if (schemas.length === 0) {
    console.log(chalk.red('The are no schemas to show! Aborting...'));
    process.exit(1);
  }

  if (schemas.length === 1) {
    const schema = schemas[0];
    console.log(chalk.green(`Selecting schema ${schema}`));
    return schema;
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'schema',
      message: 'Please select a schema',
      choices: schemas,
    },
  ]);

  return answers.schema;
};
