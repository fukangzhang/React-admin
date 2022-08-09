// 发送异步Ajax请求的模块
// 返回值是一个promise对象
// 统一处理错误请求
import axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve,reject)=>{
        // 1、执行异步ajax请求
        let promise
        if (type === "GET") {
            promise = axios.get(url,{
                params: data
            })
        }
        else {
            promise = axios.post(url, data)
        }
        // 2、成功了则调用resolve(value)
        // 3、失败了不调用regect(error)这样就导致接受promise的得不到失败的信息，
        // 3、在这里直接对失败信息进行处理(显示)，不给后续接口文件login.jsx留难题来对失败进行处理
        promise.then(response=>{
            resolve(response)
        }).catch(err=>{
            message.error("请求失败！"+err.message)
        })
    })
}   