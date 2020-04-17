const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');

const ymlExtRegex = /\.yml$/;

const currentFolder = process.cwd();
const additionalFolder = process.argv[2] || '';

function getSchemasInfo() {
  const schemaFolder = path.join(currentFolder, additionalFolder);

  if (!fs.existsSync(schemaFolder)) {
    console.log(chalk.red(`The path "${additionalFolder}" is invalid.`));
    process.exit(1);
  }

  const schemaFolderStat = fs.statSync(schemaFolder);

  if (schemaFolderStat.isFile()) {
    const schemaFileName = path.basename(additionalFolder);

    if (!ymlExtRegex.test(schemaFileName)) {
      console.log(chalk.red('The selected file has no yml extension! Aborting...'));
      process.exit(1);
    }

    return { schemas: [schemaFileName], schemaFolder: path.dirname(schemaFolder) };
  }

  const filesInSchemas = fs.readdirSync(schemaFolder);
  const schemas = filesInSchemas.filter((c) => ymlExtRegex.test(c));

  return { schemas, schemaFolder };
}

exports.getSchema = async function () {
  const { schemas, schemaFolder } = getSchemasInfo();

  if (schemas.length === 0) {
    console.log(chalk.red('The are no schemas to show! Aborting...'));
    process.exit(1);
  }

  if (schemas.length === 1) {
    const schema = schemas[0];
    console.log(chalk.green(`Selecting schema "${schema}"`));
    return { schemaFolder, schema };
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'schema',
      message: 'Please select a schema',
      choices: schemas,
    },
  ]);

  return { schemaFolder, schema: answers.schema };
};
