const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bbngyu4rv2myinzdngqw-mysql.services.clever-cloud.com',
    database: 'bbngyu4rv2myinzdngqw',
    user: 'uvafizzbdqlet2db',
    password: 'FyHClLVmGzRxPDolzhcl',
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query || '';
  const sqlQuery = 'SELECT * FROM companies WHERE companyName LIKE ?';
  
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, [`%${query}%`], (err, results) => {
      if (err) {
        return reject({
          statusCode: 500,
          body: JSON.stringify({ success: false, message: err.message })
        });
      }
      resolve({
        statusCode: 200,
        body: JSON.stringify(results)
      });
    });
  });
};
