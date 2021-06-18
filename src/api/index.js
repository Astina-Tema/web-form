import { request, globalRequst } from '../utils/http'
import { encrypt } from '../utils/encrypt'

/**
 * @desc 服务器加密
 * @param {String} initPassword -- 加密内容
  */
//  export function WebEncode(initPassword) {
//   return globalRequst.get("WebEncode", {
//     params: {
//       reg: initPassword
//     }
//   });
// }
/** 
 * @desc 服务器解密
 * @param {String} initPassword -- 解密内容
 */
// export function WebDecode(initPassword) {
//   return globalRequst.get("WebDecode", {
//     params: {
//       reg: initPassword
//     }
//   });
// }

/**
 * @func [<upLoadImg>]
 * @desc 向服务器上传图片
 * @param {String} UUID -- UUID
 * @param {String} Photo -- 图片内容 
  */
export function upLoadImg (UUID, Photo) {
  return request.post("/WSPhotoWEB",
    "reg=" + `${encrypt(`{
      "ID": ${UUID},
      "Password": "admin",
      "SiteID": "1",
      "TPP": "",
      "Type": "USER",
      "UniqueID": "${UUID}",
      "UserName": "admin",
      "Photo": "${Photo}"
    }`)}`
  )
}
/** 
 * @desc 提交表单
 * @param {Object} data -- 表单数据
 */
export function submitForm(data) {
  return request.post('/path', {
    reg: encrypt({
      P: {
        ...data
      },
      SP: 'sp'
    }),
    t: 'JSON'
  });
}
export function test() {
  return request.post('/WSTJWeb', {
    reg: encrypt({
      P: {
        CompanyName: '姓名' ,
        Gender: 1, // 性别
        HighestEducation: '最高学历' ,
        ContactBirthday: '2021-6-3', // 生日
        GovernmentIDNumber : '382943298', // 身份证号
        ContactAddress: 'asd', // 地址
        RegisteredPermanentAddressLocus: '户口所在地',
        PostCode : 123456,
        ResidenceType : '城镇类型',
        MedicalHistory: '否',
        OnTheJob: '是',
        RecommendEmployment: '是' ,
        Trianning : '是',
        ParticipatedSkillsTraining : '是' ,
        RegistrationChannel: '公众号' ,
        PersonalSkills: '个人技能' ,
        Specialty: '特长' ,
        PersonalDescription: '个人描述' ,
        Mobile: '123456', // 手机号
        EthnicityID: 1, //民族
        EmergencyContactList : JSON.stringify([{numID: 1, CompanyName: "姓名", Mobile: "123", RelationShip: "关系"}]),
        EducationList: JSON.stringify([{"numID":1,"FromDate":"2021-06-01","ToDate":"2022-06-06","SchoolName":"学校名称","Major":"专业","SchoolTypeID":2}]),
        WorkExperienceList: JSON.stringify([{"numID":1,"HireDate":"2021-06-01","DismissDate":"2022-06-06","Company":"公司名称","Reason":"离职原因","WorkingTypeName":"职位"}]),
        SignPhotoPath: '1/Users/e709caab-c3ba-4125-be4c-254852c28f14/d98a0cf5c0694342afde540602431afd.jpg' // 电子签名 图片上传的返回值
      },
      SP: 'WEb_ContactsResigter'
    }),
    t: 'JSON'
  });
}