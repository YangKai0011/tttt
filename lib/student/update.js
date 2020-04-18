const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');

  class update{
      constructor(field,arr){
            this.field = field;
            this.arr = arr;
      }
      update(){
        let arrParam = this.arr;
        const sql = `update student set ${this.field}  where studentNumber=?`;
        return new Promise(function (resolve, reject) {
          pool.query(sql, arrParam, $callback(resolve, reject));
        });
      }
    
  }

  module.exports = update;