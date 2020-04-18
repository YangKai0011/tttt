const pool = require('../../dbunit/operate');
const $callback = require('./callback');

class add{
    constructor(arr){   
        this.arr = arr;
    }
    add(){
        let sqlArr = this.arr;
        const sql = `insert into student values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        return  new Promise(function (resolve, reject) {
            pool.query(sql,sqlArr ,$callback(resolve, reject));
          });
    }
}
module.exports = add;