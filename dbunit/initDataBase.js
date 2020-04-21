const pool = require('./operate');

//账户信息表
let createAccent = `create table if not exists accents(
  id int(11) primary key auto_increment,
  accent varchar(15) not null,
  password varchar(20) not null,
  role varchar(10)
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;
 
let createDeMe = `CREATE TABLE IF NOT EXISTS departmentmajor(
	departments VARCHAR(20) NOT NULL COMMENT '系名',
	professions VARCHAR(20) PRIMARY KEY NOT NULL COMMENT '专业'
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;

//学生信息表
let createStudent = `CREATE TABLE IF NOT EXISTS  student(
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	studentNumber VARCHAR(11) UNICODE COMMENT '学号',
	studentName VARCHAR(6) NOT NULL COMMENT '姓名',
	department VARCHAR(20) NOT NULL COMMENT '系名',
	profession VARCHAR(20)  NOT NULL COMMENT '专业',
	grade VARCHAR(10) NOT NULL COMMENT '年级',
	class VARCHAR(20) NOT NULL COMMENT '班级',
	phoneNumber VARCHAR(12) COMMENT '电话',
	instructName VARCHAR(5) COMMENT '导员姓名',
	instructPhone VARCHAR(11) COMMENT '导员电话',
	buildNumber INT(11) COMMENT '楼号',
	dormitoryNumber INT(11) COMMENT '宿舍号',
	dormitoryLeader VARCHAR(5) COMMENT '宿舍长',
	LeaderPhone VARCHAR(11) COMMENT '宿舍长电话',
	fatherPhone VARCHAR(11) COMMENT '父亲电话',
	motherPhone VARCHAR(11) COMMENT '母亲电话',
	stubName VARCHAR(5) COMMENT '宿管员姓名',
	stubPhone VARCHAR(11) COMMENT '宿官员电话',
	photo VARCHAR(100) COMMENT '图片保存路径',
	CONSTRAINT fk_pro FOREIGN KEY(profession) REFERENCES departmentmajor(professions)
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;

//宿舍评比得分记录表
let createAppraisal = `CREATE TABLE IF NOT EXISTS appraisal(
	buildNumber INT(11) COMMENT '楼号',
	dormitoryNumber INT(11) COMMENT '宿舍号',
	violations INT(11) COMMENT '违规项得分',
	neatItems INT(11) COMMENT '整洁项得分',
	score INT(11) COMMENT '总体得分',
	options VARCHAR(100) COMMENT '被扣选项',
	checkDate  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '检查日期'
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;

//中间表
let createResult = `CREATE TABLE IF NOT EXISTS result(
	buildNumber INT(11) COMMENT '楼号',
	dormitoryNumber INT(11) COMMENT '宿舍号',
	score INT(11) COMMENT '总体得分',
	instructName VARCHAR(5) COMMENT '导员姓名',
	grade VARCHAR(10) COMMENT '年级',
	profession VARCHAR(20) COMMENT '专业',
	checkDate  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '检查日期'
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;

let creatBuMe = `CREATE TABLE IF NOT EXISTS buildingmanagement(
	buildNumber INT(11) COMMENT '楼号',
	dormitoryNumber INT(11) COMMENT '宿舍号',
	application VARCHAR(20) COMMENT '用途'
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;
module.exports = function () {
  pool.query(createAccent, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(createDeMe, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(createStudent, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(createAppraisal, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(createResult, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(creatBuMe, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
};
