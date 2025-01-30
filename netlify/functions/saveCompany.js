const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bbngyu4rv2myinzdngqw-mysql.services.clever-cloud.com',
    database: 'bbngyu4rv2myinzdngqw',
    user: 'uvafizzbdqlet2db',
    password: 'FyHClLVmGzRxPDolzhcl',
});

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { companyName, section, division, sector, industry, coverSituation } = JSON.parse(event.body);

    const query = 'INSERT INTO companies (companyName, section, division, sector, industry, coverSituation) VALUES (?, ?, ?, ?, ?, ?)';
    
    return new Promise((resolve, reject) => {
      db.query(query, [companyName, section, division, sector, industry, coverSituation], (err, results) => {
        if (err) {
          return reject({
            statusCode: 500,
            body: JSON.stringify({ success: false, message: err.message })
          });
        }
        resolve({
          statusCode: 200,
          body: JSON.stringify({ success: true, message: 'Data saved successfully' })
        });
      });
    });
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
  };
};
