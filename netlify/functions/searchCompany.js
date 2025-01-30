const { Client } = require('pg'); // or another database client

exports.handler = async function (event, context) {
  const { name } = event.queryStringParameters;

  // Connect to the database
  const client = new Client({
    host: 'bbngyu4rv2myinzdngqw-mysql.services.clever-cloud.com',
    database: 'bbngyu4rv2myinzdngqw',
    user: 'uvafizzbdqlet2db',
    password: 'FyHClLVmGzRxPDolzhcl',
  });

  try {
    await client.connect();
    const result = await client.query(
      'SELECT * FROM DICA WHERE COMPANY_NAME ILIKE $1',
      [`%${name}%`]
    );
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};
