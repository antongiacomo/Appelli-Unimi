const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try{

    const response = await fetch(`https://work.unimi.it/foProssimiEsami/json/F94/`);
    const data     = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};