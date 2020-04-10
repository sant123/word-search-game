const fs = require('fs');

const { JSDOM } = require('jsdom');

const DEFAULT_FORM_DATA = require('./lib/default-form-data');
const { generateWordSearch } = require('./lib/call-service');
const { prepareForPrint, removeExtraContent: removeScripts } = require('./lib/clean-js');

const CUSTOM_FORM_DATA = {
  puzzleTitle: 'Animales',
  inputWords: 'Serpiente,Gato,Perro,Venado,Caballo,Bufalo,Vaca,Becerro,Murcielago,Gacela,Paloma,Zancudo,Mosca,Abeja,Pulga',
};

const THE_FORM_DATA = { ...DEFAULT_FORM_DATA, ...CUSTOM_FORM_DATA };

generateWordSearch(THE_FORM_DATA).then((response) => {
  const dom = new JSDOM(response);
  const { document } = dom.window;

  prepareForPrint(document);
  removeScripts(document);

  fs.writeFileSync('./response.html', dom.serialize());
});
