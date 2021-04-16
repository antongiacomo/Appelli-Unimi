
const axios = require('axios');

exports.handler = async (event, context) => {
  try{

    const response = await axios(`https://work.unimi.it/foProssimiEsami/json/F94/`);
    const data     = await response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};

