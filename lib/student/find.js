const pool = require('../../dbunit/operate');
const $callback = require('./callback');

class find{

    constructor(field, column,arr){
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

}

module.exports = find;