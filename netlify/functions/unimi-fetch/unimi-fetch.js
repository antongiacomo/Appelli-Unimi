
const axios = require('axios');

exports.handler = async (event, context) => {
  try{

    const response = await axios(`https://work.unimi.it/foProssimiEsami/json/F94/`);
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