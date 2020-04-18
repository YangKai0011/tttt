module.exports = function (resolve, reject) {
    return function (err, results, fields) {
        resolve({ err: err, results: results, fields: fields });
        reject({ err: err });
    }
}