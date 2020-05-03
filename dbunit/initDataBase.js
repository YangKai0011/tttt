const pool = require('./operate');

//账户信息表
let createAccent = `create table if not exists accents(
  id int(11) primary key auto_increment,
  accent varchar(15) not null,
  password varchar(20) not null,
  role varchar(10) not null,
  positions varchar(10) not NULL
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
	CONSTRAINT fk_pro FOREIGN KEY(profession) REFERENCES departmentmajor(professions),
	CONSTRAINT fk_pro_1 FOREIGN KEY(grade) REFERENCES grademajor(grade),
	CONSTRAINT fk_pro_3 FOREIGN KEY(buildNumber) REFERENCES buildmajor(buildNumber)
)ENGINE=INNODB DEFAULT CHARSET=utf8;`;

//宿舍评比得分记录表
let createAppraisal = `CREATE TABLE IF NOT EXISTS appraisal (
	buildNumber int(11) DEFAULT NULL COMMENT '楼号',
	dormitoryNumber int(11) DEFAULT NULL COMMENT '宿舍号',
	violations int(11) DEFAULT NULL COMMENT '违规项得分',
	neatItems int(11) DEFAULT NULL COMMENT '整洁项得分',
	score int(11) DEFAULT NULL COMMENT '总体得分',
	options varchar(100) DEFAULT NULL COMMENT '被扣选项',
	checkDate timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '检查日期',
	UNIQUE KEY buildNumber (buildNumber,dormitoryNumber,violations,neatItems,score,options,checkDate),
	CONSTRAINT fk_pro_4 FOREIGN KEY (buildNumber) REFERENCES student (buildNumber)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `;

//中间表
let createResult = `CREATE TABLE IF NOT EXISTS result (
	buildNumber int(11) DEFAULT NULL COMMENT '楼号',
	dormitoryNumber int(11) DEFAULT NULL COMMENT '宿舍号',
	score int(11) DEFAULT NULL COMMENT '总体得分',
	instructName varchar(5) DEFAULT NULL COMMENT '导员姓名',
	grade varchar(10) DEFAULT NULL COMMENT '年级',
	profession varchar(20) DEFAULT NULL COMMENT '专业',
	checkDate timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '检查日期',
	KEY fk_pro_2 (buildNumber),
	CONSTRAINT fk_pro_2 FOREIGN KEY (buildNumber) REFERENCES appraisal (buildNumber)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
  `;

//宿舍用途表
let creatBuMe = `CREATE TABLE IF NOT EXISTS buildingmanagement (
	buildNumber int(11) DEFAULT NULL COMMENT '楼号',
	dormitoryNumber int(11) DEFAULT NULL COMMENT '宿舍号',
	application varchar(20) DEFAULT NULL COMMENT '用途',
	department varchar(10) DEFAULT NULL COMMENT '部门',
	UNIQUE KEY buildNumber (buildNumber,dormitoryNumber),
	CONSTRAINT fk_pro_5 FOREIGN KEY (buildNumber) REFERENCES buildmajor (buildNumber)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

let creatBuMa = `CREATE TABLE IF NOT EXISTS buildmajor (
	buildNumber int(11) NOT NULL COMMENT '楼号',
	PRIMARY KEY (buildNumber)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

let createGrMa = `CREATE TABLE IF NOT EXISTS grademajor (
	grade varchar(10) NOT NULL COMMENT '年级',
	PRIMARY KEY (grade)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
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
  pool.query(creatBuMa, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  pool.query(createGrMa, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
};
