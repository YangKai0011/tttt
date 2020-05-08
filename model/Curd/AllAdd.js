const pool = require('../../dbunit/operate');
const $callback = require('../../lib/student/callback');
class AllAdd  {
     addByInstruct(arr) {
        const sql = 'insert into student(studentNumber, studentName, department, profession, grade, class) values(?,?,?,?,?,?)'
        return new Promise(function (resolve, reject) {
            pool.query(sql, arr, $callback(resolve, reject));
        });
       
    }
    addMessage(sqlArr) {
        console.log(sqlArr);
        const sql = 'insert into student(studentNumber,studentName,department,profession,grade,class,phoneNumber,instructName,instructPhone,buildNumber,dormitoryNumber,dormitoryLeader,LeaderPhone,fatherPhone,motherPhone,stubName,stubPhone) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        return new Promise(function (resolve, reject) {
            pool.query(sql, sqlArr, $callback(resolve, reject));
        });
    }

    //宿舍评比将检查的结果上传
    addAppraisal(sqlArr) {
       
        const sql = `INSERT INTO appraisal(buildNumber, dormitoryNumber, violations, neatItems, score,options) VALUES(?,?,?,?,?,?);`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, sqlArr, $callback(resolve, reject));
        });
    }
    //中间表主要用来计算平均分
    addResult(){
        const sql =   `INSERT INTO result  SELECT DISTINCT appraisal.buildNumber, appraisal.dormitoryNumber,appraisal.score, student.instructName,student.grade,student.profession,appraisal.checkDate,student.department FROM appraisal LEFT JOIN student ON appraisal.buildNumber = student.buildNumber AND appraisal.dormitoryNumber = student.dormitoryNumber WHERE DATE_FORMAT(checkDate,'%Y%m')=DATE_FORMAT(CURDATE(),'%Y%m');`;
        return new Promise(function (resolve, reject) {
            pool.query(sql, $callback(resolve, reject));
        });
    }
    
    //增加宿舍用途信息
    addBuildingMa(arr){
        const sql =   `INSERT INTO buildingmanagement (buildNumber,dormitoryNumber,application,department) VALUE(?,?,?,?) ON DUPLICATE KEY UPDATE application=?,department=?;`;
        return new Promise(function (resolve, reject) {
            pool.query(sql,arr ,$callback(resolve, reject));
        });
    }
}

module.exports = AllAdd;