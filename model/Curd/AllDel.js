const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');
class AllDel {

    deleteByStudentNumber(param) {
        let sqlPinJie = param[0];
        for (let i = 1; i < param.length; i++) {
          if (param.length === 1) {
            break;
          } else {
            sqlPinJie += ',';
            sqlPinJie += param[i];
          }
        }
        const sql = `delete from student where studentNumber in(${sqlPinJie})`;
        return  new Promise(function (resolve, reject) {
          pool.query(sql, $callback(resolve, reject));
        });
      }

} 

module.exports = AllDel;