import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button,  Form, Input , message} from 'antd'

import "./index.less"
import logo from "../../assets/images/image_icon.jpg"

import { useNavigate } from 'react-router-dom'
import { reqLogin } from '../../api'          //接口
import storageUtils from '../../utils/storageUtils'
export default function Login() {
    let navigate = useNavigate()
    async function onFinish(values) {
        const { username, password } = values
        // reqLogin(username,password).then(response=>{
        //     console.log('请求成功',response.data)
        // }).catch(err=>{
        //     console.log('失败',err)
        // })
        const response = await reqLogin(username, password)
        // 处理登录失败和成功
        const result = response.data
        if (result.status === 0) {
            message.success('登录成功！')
            // 保存登录状态
            const user = result.data
            storageUtils.saveUser(user)  
            // 路由跳转--跳转到管理页面admin
            navigate('/', {replace:true})
        }
        else {
            message.error(result.msg)
        }
    }
    function validatePWD(rule, value, callback) {
        // callback('')//参数表示验证的提示例如：请输入密码；为空表示验证通过(这是4.0版本之前)
        // 4.0版本需要使用Promise
        return new Promise((resolve, reject) => {
            if (!value.trim()) reject('输入不能为空')
            else if (value.length < 4) reject('长度不小于4位')
            else if (value.length > 12) reject('长度不大于12位')
            else if (!/^[a-zA-Z0-9_]+$/.test(value)) reject('用户名必须是英文字母数字下划线')
            else resolve('输入正确')
        })
    }
    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo" />
                <h1>react项目-商城管理后台</h1>
            </header>
            <section className='login-content'>
                <h2>用户登录</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        // 声明式验证：直接使用antd库提供的验证
                        rules={[
                            { required: true, message: '输入你的用户名' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文字母数字下划线' },
                            { whitespace: true }
                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { validator: validatePWD }
                        ]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
}
 