import axios from 'axios'

export const request = axios.create({
	baseURL: 'https://conduit.productionready.io'
})

export default ({ store }) =>  {
	// 请求拦截器
	// Add a request interceptor
	request.interceptors.request.use(function (config) {
		const { user } = store.state
	  // Do something before request is sent
	  if (user && user.token) {
	  	config.headers.Authorization = `Token ${user.token}`
	  }
	  return config;
	}, function (error) {
		// 没有调用接口就失败了
	  // Do something with request error
	  return Promise.reject(error);
	})
}