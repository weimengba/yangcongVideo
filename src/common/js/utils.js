import * as qiniu from 'qiniu-js'
import { putExtra, config } from './config'

// 格式化数字
const _pad = (num, n = 2) => {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

// 七牛上传sdk
export const upload = (file, key, token, observer) => {
  const observable = qiniu.upload(file, key, token, putExtra, config)
  // 开始上传
  const subscription = observable.subscribe(observer)
}

// 格式化七牛存储key
export const formatKey = suffix => {
  const noncestr = ((Math.random().toString(36)).substr(2)).toUpperCase()
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const key = `${year}/${_pad(month)}${_pad(day)}/${noncestr}${suffix}`
  return key
}

// 读取cookie
export const getCookie = (c_name) => {
  if(document.cookie.length>0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if(c_start!=-1) { 
      c_start=c_start + c_name.length+1 
      var c_end=document.cookie.indexOf(';', c_start)
      if(c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    } 
  }
  return ''
}