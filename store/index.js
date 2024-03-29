const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
	return {
		user: null
	}
}
export const mutations = {
  setUser(state, data) {
    state.user = data
  },
  delUser(state) {
    state.user = ''
  }
}
export const actions = {
	// nuxtServerInit 是一个特殊的 action 方法，会在服务端渲染期间自动调用
	// 作用： 初始化容器数据，传递数据给客户端使用
	nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}