const pool = require('../../dbunit/operate');
const $callback = require('./callback');
class deletes {
    delete(){
        const sql = `delete from student where studentNumber=?;`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, $callback(resolve, reject));
          });
    }
}

module.exports = deletes;