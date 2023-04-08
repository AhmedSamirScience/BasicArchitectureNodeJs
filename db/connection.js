/**
 * hna b2a el by3melk ezai hy-query mn 3aleh el database bt3ti 7aga kda zai genaric function btnf3 le ay query swa2 select update aw delete ay 7aga 
 */

var pool = require('./pool');

exports.dbQuery = (queryText, queryParams) => {
    return new Promise((resolve , reject) => {
        pool.query(queryText, queryParams)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    });
}