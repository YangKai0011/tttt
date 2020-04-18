const $delete = require('../../lib/student/delete');
const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');

class AllDel extends $delete{

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
        const sql = `delete from student where studentNumber in(00000000)`;
        return  new Promise(function (resolve, reject) {
          pool.query(sql, $callback(resolve, reject));
        });
      }

} 

module.exports = AllDel;