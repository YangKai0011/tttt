
const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');
module.exports =  {
    update(sqlPinJie,arrParam){
        const sql = `update student set ${sqlPinJie}  where studentNumber=?`;
        return new Promise(function (resolve, reject) {
          pool.query(sql, arrParam, $callback(resolve, reject));
        });
      },

      updateMajor(param){
        const sql = `update buildingmanagement set application=? where buildNumber=? and dormitoryNumber=? `;
        return new Promise(function (resolve, reject) {
          pool.query(sql, [param.application,param.buildNumber,param.dormitoryNumber], $callback(resolve, reject));
        });
      }
}
