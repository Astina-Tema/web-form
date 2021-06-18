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