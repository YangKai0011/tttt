const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');


module.exports = {

    //按照宿舍号楼号查询学生信息
    //TODO
    findDormitory: (field, column, arr) => {
        const sql = `select ${field} from student where  buildNumber=? ${column}  dormitoryNumber=?;`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    },
    instructDormitory: (field, column, arr) => {
        console.log(arr);
        const sql = `select ${field} from student where (department=? and grade=?) and  (buildNumber=? ${column}  dormitoryNumber=?);`;
        console.log(sql);
        
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    },

    //查询宿舍分布
    findDistributed: (field, column, arr) => {
        let sql = null;
        let profession = null;
        if (arr.length === 2) {
            profession = arr[1];
            sql = `select DISTINCT ${field} from student where grade=? ${column}  profession like '%${profession}%' `;
        } else {
            profession = arr[2];
            sql = `select DISTINCT ${field} from student where department=? and (grade=? ${column}  profession like '%${profession}%') `;
        }
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    },
    //学工部根据导员查宿舍分布
    findDistributedC: (field, column, arr) => {
        const sql = `SELECT DISTINCT buildNumber, dormitoryNumber  FROM  student WHERE  instructName = ?`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    },

    //学号姓名查询详细信息
    findDetail: (field, column, arr) => {
        let sql = null;
        if (arr.length === 3) {
            sql = `SELECT ${field} FROM  student where buildNumber=? and (studentName=? ${column} studentNumber=? )`;
        } else {
            sql = `SELECT ${field} FROM  student where studentName=? ${column} studentNumber=? `;
        }
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
    },
    findStub: (param, position) => {
        let profession = Object.values(param)[profession];
        let buildNumber = position;
       /*  let sqlPinJie = null; let sqlArr = [];
        const positions = position;
        let arr = Object.keys(param);
        const index = arr.filter(item => param[item] !== undefined);
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
        } */
        const sql = `SELECT studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone FROM  student WHERE buildNumber=? and (grade=? or profession like '%${profession}%' or department=?)`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, [buildNumber,Object.values(param)[grade],Object.values(param)[department]], $callback(resolve, reject));
        });
    },

    //查询所有宿舍的总分，显示导员
    findScore: () => {
        const sql = `SELECT DISTINCT appraisal.buildNumber, appraisal.dormitoryNumber,appraisal.score, student.instructName FROM appraisal LEFT JOIN student ON appraisal.buildNumber = student.buildNumber AND appraisal.dormitoryNumber = student.dormitoryNumber;`;
        return new Promise((resolve, reject) => {
            pool.query(sql, $callback(resolve, reject));
        })
    },

    //显示每个导员所管辖的年级和专业所对应的平均分
    findAvg: () => {
        const sql = `SELECT AVG(score) as AVG ,any_value(instructName) as instructName,any_value(DATE_FORMAT(checkDate,'%Y-%m')) as times FROM result WHERE DATE_FORMAT(checkDate,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m')  GROUP BY instructName;`;
        console.log(sql);
        
        return new Promise((resolve, reject) => {
            pool.query(sql, $callback(resolve, reject));
        });
    },



    //显示宿舍得分详情总分,各违纪项
    findApDe: () => {
        const sql = `SELECT buildNumber, dormitoryNumber, OPTIONS, score,DATE_FORMAT(checkDate,'%Y-%m') as times FROM appraisal WHERE DATE_FORMAT(checkDate,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m');`;
        return new Promise((resolve, reject) => {
            pool.query(sql, $callback(resolve, reject));
        });
    },

    //查询宿舍用途
    findBuMe: () => {
        const sql = `SELECT buildNumber,dormitoryNumber,  application FROM buildingmanagement WHERE application IS NOT NULL`;
        return new Promise((resolve, reject) => {
            pool.query(sql, $callback(resolve, reject));
        });
    }
}

