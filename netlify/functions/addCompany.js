const { Client } = require('pg'); // or use another database client (e.g., Firebase, MySQL)

exports.handler = async function (event, context) {
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);

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
        'INSERT INTO companies (company_name, section, division, sector, industry, cover_situation) VALUES ($1, $2, $3, $4, $5, $6)',
        [data.companyName, data.section, data.division, data.sector, data.industry, data.coverSituation]
      );
      await client.end();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Company data saved' }),
      };
    } catch (error) {
      console.error('Database error', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving data' }),
      };
    }
  }
};
