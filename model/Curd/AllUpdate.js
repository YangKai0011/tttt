
const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');
module.exports =  {
    update(sqlPinJie,arrParam){
        const sql = `update student set ${sqlPinJie}  where studentNumber=?`;
        return new Promise(function (resolve, reject) {
          pool.query(sql, arrParam, $callback(resolve, reject));
        });
      }
}
