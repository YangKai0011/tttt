const find = require('../../lib/student/find');
const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');


class AllFind extends find {

    //按照宿舍号楼号查询学生信息
    findDormitory() {
        let arr = this.arr;
        const sql = `select ${this.field} from student where buildNumber=? ${this.column} dormitoryNumber=?;`;
        console.log(sql);

        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    }

    //查询宿舍分布
    findDistributed() {
        let arr = this.arr;
        if (arr.length === 2) {
            let profession = arr[1];
            let sql = `select DISTINCT ${this.field} from student where grade=? ${this.column}  profession like '%${profession}%' `;
            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        } else {
            let profession = arr[2];
            let num = arr[1] === 'undefined' && arr[2] === 'undefined' ? 'or' : 'and';
            let sql = `select DISTINCT ${this.field} from student where department=? ${num} (grade=? ${this.column}  profession like '%${profession}%') `;
            console.log(sql);
            console.log(arr);

            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        }
    }
    //学号姓名查询详细信息
    findDetail() {
        let arr = this.arr;
        if (arr.length === 3) {
            const sql = `SELECT ${this.field} FROM  student where buildNumber=? and (studentName=? ${this.column} studentNumber=? )`;
            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        }else{
            const sql = `SELECT ${this.field} FROM  student where studentName=? ${this.column} studentNumber=? `;
            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        }
    }
    findStub(param) {
        if (Object.keys(param).length === 5) {
            let sqlPinJie = null; let sqlArr = [];
            const positions = param.positions;
            //删除无关的键值对
            delete param.type; delete param.role; delete param.positions
            let arr = Object.keys(param);
            const index = arr.filter(item => param[item] !== 'undefined');
            switch (index.length) {
                case 1:
                    sqlPinJie = index + '=?';
                    sqlArr = [positions, param[index]];
                    break;
                case 2:
                    sqlPinJie = index[0] + '=? and ' + index[1] + '=? ';
                    sqlArr = [positions, param[index[0]], param[index[1]]];
                    break;
                case 3:
                    sqlPinJie = index[0] + '=? and ' + index[1] + ' =? ' + ' and ' + index[2] + '=?';
                    sqlArr = [positions, param[index[0]], param[index[1]], param[index[2]]];
                    break;
            }
            param['type'] = 'search'; param['role'] = 'House'; param['positions'] = positions;
            const sql = `SELECT studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone FROM  student WHERE buildNumber=? and (${sqlPinJie})`;
            return new Promise(function (resolve, reject) {
                pool.query(sql, sqlArr, callback(resolve, reject));
            });
        }
    }


}

module.exports = AllFind;