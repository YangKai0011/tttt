const pool = require('../../dbunit/operate');

  class BaseSql {
    constructor(field, column, arr){
        this.field = field;
        this.column = column;
        this.arr = arr;
    }
    find(){
        const sql = `select * from student`;
        return (promise = new Promise(function (resolve, reject) {
            pool.query(sql,$callback(resolve, reject));
          }));
    }
    delete(){
        const sql = `delete from student where studentNumber=?;`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, $callback(resolve, reject));
          });
    }
    add(){
        let sqlArr = this.arr;
        const sql = `insert into student values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        return  new Promise(function (resolve, reject) {
            pool.query(sql,sqlArr ,$callback(resolve, reject));
          });
    }
    update(){
        let arrParam = this.arr;
        const sql = `update student set ${this.field}  where studentNumber=?`;
        return new Promise(function (resolve, reject) {
          pool.query(sql, arrParam, $callback(resolve, reject));
        });
      }
  }

  module.exports = BaseSql;