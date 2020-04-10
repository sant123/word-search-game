const http = require('https');
const qs = require('qs');
const zlib = require('zlib');

const SERVICE_URL = 'https://tools.atozteacherstuff.com/word-search-maker/wordsearch.php';

function getServiceOptions(formData) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(formData),
    },
  };
}

exports.generateWordSearch = function (formData) {
  const ENCODED_DATA = qs.stringify(formData);
  const SERVICE_OPTIONS = getServiceOptions(ENCODED_DATA);
  const SERVICE_REQUEST = http.request(SERVICE_URL, SERVICE_OPTIONS);

  return new Promise((resolve) => {
    let buffers = [];
    let bufferLength = 0;

    SERVICE_REQUEST.on('response', (res) => {
      res
        .pipe(zlib.createGunzip())
        .on('data', (chunk) => {
          bufferLength += chunk.length;
          buffers.push(chunk);
        })
        .on('end', () => {
          const responseBuffer = Buffer.concat(buffers, bufferLength);
          resolve(responseBuffer.toString());
        });
    });

    SERVICE_REQUEST.write(ENCODED_DATA);
    SERVICE_REQUEST.end();
  });
};
