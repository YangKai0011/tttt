module.exports = {
    SelectHashTable: {
        'findDormitory': '按照宿舍号楼号查询',
        'findDistributed': '按照年级专业查询',
        'findDetail': '按照学号姓名查询',
        'findStub': '按照宿管号年级专业系别查询',
        'findDistributedC': '按导员查询宿舍分布',
        'instructDormitory':'按照宿舍号楼号查询'
    },
    Controller: {
        oper: { '学生住宿信息管理': ['查询'], '宿舍评比、奖惩': [ '宿舍分值登记','宿舍分值查询'],'宿舍信息管理':['宿舍管理','宿舍平面图'/* ,'删除','修改','查找' */] /* ,  '导员信息维护': [] */ },
        学生住宿信息管理: {
            find: { 'findDormitory': ['buildNumber', 'dormitoryNumber'], 'findDistributed': ['grade', 'profession'], 'findDistributedC':['instructName']},
        },
        宿舍评比: {
            /* find: { 'findScore': [],'findAvg':[],'findApDe':[] }, */
            add: { 'addAppraisal': ['buildNumber', 'dormitoryNumber', 'violations', 'neatItems', 'score', 'optiones'] }

        }
    },
    Instructor: {
        oper: { '学生住宿信息管理': ['学生信息管理', '添加','调宿'] },
        学生住宿信息管理: {
            find: { 'instructDormitory': ['buildNumber', 'dormitoryNumber'], 'findDetail': ['studentName', 'studentNumber'], 'findDistributed': ['profession'] }
        }
    },

    DeLeader: {
        oper: { '学生住宿信息管理': ['查询'] },
        学生住宿信息管理: {
            find: { 'findDistributed': ['grade', 'profession'] }
        }
    },

    House: {
        oper: { '学生住宿信息管理': ['查询'] },
        学生住宿信息管理: {
            find: { 'findDormitory': ['dormitoryNumber'], 'findStub': ['grade', 'profession', 'department'], 'findDetail': ['studentName', 'studentNumber'] }
        }
    },
}