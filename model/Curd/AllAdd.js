const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');
const BaseSql = require('../../lib/student/BaseSql');
class AllAdd extends BaseSql {
    addByInstruct(arr,callback) {
        const sql = 'insert into student(studentNumber, studentName, department, profession, grade, class) values(?,?,?,?,?,?)';
        pool.getConnection(function (err, conn) {
            if (err) throw err;
            conn.beginTransaction(function (err) {
                try {
                    if (err) throw err;
                    conn.query(sql, arr, function (err, results) {
                        if (err) {
                            console.log(err);
                            console.log(err.sql);
                            //回滚事务
                            conn.rollback(function () {
                                return callback(err.sql, null);
                            });
                        } else {
                            console.log('提交事务');
                            conn.commit(function () {
                                console.log('success');
                            });
                            conn.rollback(function () {
                                return callback(null, results);
                            })
                        }
                    });
                } finally {
                    conn.release();
                }
            });
        });
    }
    addMessage(sqlArr) {
        /* let sqlArr = this.arr;
        console.log(sqlArr);
         */
        const sql = 'insert into student(studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,buildNumber,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone,stubName,stubPhone,photo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        return new Promise(function (resolve, reject) {
          pool.query(sql,sqlArr , $callback(resolve, reject));
        });
      }
}

module.exports = AllAdd;