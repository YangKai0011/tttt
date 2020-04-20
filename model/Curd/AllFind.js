const BaseSql = require('../../lib/student/BaseSql');
const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');


class AllFind extends BaseSql {

    //按照宿舍号楼号查询学生信息
    findDormitory() {
        let arr = this.arr;
        const sql = `select ${this.field} from student where buildNumber=? ${this.column}  dormitoryNumber=?;`;
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
            let sql = `select DISTINCT ${this.field} from student where department=? and (grade=? ${this.column}  profession like '%${profession}%') `;
            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        }
    }

    findDistributedC(param){
        if (Object.keys(param).length === 5) {
            let sqlPinJie = null; let sqlArr = [];
            //删除无关的键值对
            delete param.type; delete param.role;
            let arr = Object.keys(param);
            const index = arr.filter(item => param[item] !== 'undefined');
            switch (index.length) {
                case 1:
                    sqlPinJie = index + '=?';
                    sqlArr = [param[index]];
                    break;
                case 2:
                    sqlPinJie = index[0] + '=? and ' + index[1] + '=? ';
                    sqlArr = [param[index[0]], param[index[1]]];
                    break;
                case 3:
                    sqlPinJie = index[0] + '=? and ' + index[1] + ' =? ' + ' and ' + index[2] + '=?';
                    sqlArr = [param[index[0]], param[index[1]], param[index[2]]];
                    break;
            }
            param['type'] = 'findDistributedC'; param['role'] = 'Controller'; 
            const sql = `SELECT DISTINCT buildNumber, dormitoryNumber  FROM  student WHERE  (${sqlPinJie})`;
            console.log(sql);
            console.log(sqlArr);
            
            return new Promise(function (resolve, reject) {
                pool.query(sql, sqlArr, $callback(resolve, reject));
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
            console.log(sql);
            console.log(arr);
            
            
            return new Promise(function (resolve, reject) {
                pool.query(sql, arr, $callback(resolve, reject));
            });
        }
    }
    findStub(param,position) {
        if (Object.keys(param).length === 5) {
            let sqlPinJie = null; let sqlArr = [];
            const positions = position;
            console.log(positions);
            //删除无关的键值对
            delete param.type; delete param.role;
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
            param['type'] = 'findStub'; param['role'] = 'House'; param['positions'] = positions;
            const sql = `SELECT studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone FROM  student WHERE buildNumber=? and (${sqlPinJie})`;
            return new Promise(function (resolve, reject) {
                pool.query(sql, sqlArr, $callback(resolve, reject));
            });
        }
    }

    //查询所有宿舍的总分，显示导员
    findScore(){
       const sql =  `SELECT DISTINCT appraisal.buildNumber, appraisal.dormitoryNumber,appraisal.score, student.instructName FROM appraisal LEFT JOIN student ON appraisal.buildNumber = student.buildNumber AND appraisal.dormitoryNumber = student.dormitoryNumber;`;
       return new Promise((resolve, reject)=>{
           pool.query(sql,$callback(resolve, reject));
       })
    }

    //显示每个导员所管辖的年级和专业所对应的平均分
    findAvg(){
        const sql = `SELECT AVG(score) ,instructName,grade,profession FROM result WHERE DATE_FORMAT(checkDate,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m') GROUP BY grade ,profession ;`;
        return new Promise((resolve, reject)=>{
            pool.query(sql,$callback(resolve, reject));
        });
    }

    //显示宿舍得分详情总分,各违纪项
    findApDe(){
        const sql = `SELECT buildNumber, dormitoryNumber, optiones, score FROM appraisal WHERE DATE_FORMAT(checkDate,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m');`;
        return new Promise((resolve, reject)=>{
            pool.query(sql,$callback(resolve, reject));
        });
    }


}

module.exports = AllFind;