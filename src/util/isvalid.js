export function isvalidPhone(str) {
  const reg = /^1[3|4|5|6|7|8]|9[0-9]\d{8}$/
  return reg.test(str)
}
export function validPhone(rule, value,callback) {
  if (!value){
    callback(new Error('请输入电话号码'))
  }else  if (!isvalidPhone(value)){
    callback(new Error('请输入正确的11位手机号码'))
  }else {
    callback()
  }
}
