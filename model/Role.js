module.exports = {
    SelectHashTable: {
        'findDormitory': '按照宿舍号楼号查询',
        'findDistributed': '按照年级专业查询',
        'findDetail': '按照学号姓名查询',
        'findStub': '按照宿管号年级专业系别查询',
        'findScore': '查询所有宿舍成绩',
        'findAvg': '按每个导员所管辖的年级专业查询平均分',
        'findApDe': '显示宿舍得分详情总分,各违纪项'
    },

    Controller: {
        oper: { '学生住宿信息管理': ['查询', '宿舍平面图'], '宿舍评比、奖惩': ['添加', '查询'] /* ,  '导员信息维护': [] */ },
        学生住宿信息管理: {
            find: { 'findDormitory': ['buildNumber', 'dormitoryNumber'], 'findDistributed': ['grade', 'profession'] },
        },
        宿舍评比: {
            /* find: { 'findScore': [],'findAvg':[],'findApDe':[] }, */
            add: { 'addAppraisal': ['buildNumber', 'dormitoryNumber', 'violationssc', 'neatItemssc', 'score', 'optiones'] }

        }
    },
    Instructor: {
        oper: { '学生住宿信息管理': ['查询', '添加','调宿'] },
        学生住宿信息管理: {
            find: { 'findDormitory': ['buildNumber', 'dormitoryNumber'], 'findDetail': ['studentName', 'studentNumber'], 'findDistributed': ['profession'] }
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