import { request } from '@/plugins/request'

// 用户登录
export const toLogin = data => {
	return request({
		method: 'POST',
		url:'/api/users/login',
		data
	})
}
// 用户注册
export const toRegist = data => {
	return request({
		method: 'POST',
		url:'/api/users',
		data
	})
}
// 获取用户信息
export const getUserInfo = () => {
	return request({
		method: 'GET',
		url:'/api/user'
	})
}
// 更新用户信息
export const opdateUserInfo = data => {
	return request({
		method: 'Put',
		url:'/api/user',
		data
	})
}
// 获取个人中心数据
export const getProfile = username => {
	return request({
		method: 'GET',
		url: `/api/profiles/${username}`
	})
}
// 关注
export const addFollow = username => {
	return request({
		method: 'POST',
		url: `/api/profiles/${username}/follow`
	})
}
// 取消关注
export const delFollow = username => {
	return request({
		method: 'DELETE',
		url: `/api/profiles/${username}/follow`
	})
}