<template>
	<div class="auth-page">
	  <div class="container page">
	    <div class="row">

	      <div class="col-md-6 offset-md-3 col-xs-12">
	        <h1 class="text-xs-center">{{isLogin ? 'Sign up' : 'Sign in'}}</h1>
	        <p class="text-xs-center">
	          <router-link v-if="!isLogin" to="/login">Have an account?</router-link>
	          <router-link v-if="isLogin" to="/regist">Need an account?</router-link>
	        </p>

	        <ul class="error-messages">
	        	<template v-for="(msgs, filed) in errMsg">
	        		<li v-for="(msg, index) in msgs" :key="index">{{filed}} {{msg}}</li>
	        	</template>
	          
	        </ul>

	        <form @submit.prevent="submit">
	          <fieldset class="form-group" v-if="!isLogin">
	            <input class="form-control form-control-lg" type="text" v-model="user.username" placeholder="Your Name" required>
	          </fieldset>
	          <fieldset class="form-group">
	            <input class="form-control form-control-lg" type="email" v-model="user.email" placeholder="Email" required>
	          </fieldset>
	          <fieldset class="form-group">
	            <input class="form-control form-control-lg" type="password" v-model="user.password" placeholder="Password" minlength="8" required>
	          </fieldset>
	          <button class="btn btn-lg btn-primary pull-xs-right">
	            {{isLogin ? 'Sign up' : 'Sign in'}}
	          </button>
	        </form>
	      </div>

	    </div>
	  </div>
	</div>
</template>
<script>
import { toLogin, toRegist } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
	middleware: 'notAuthenticated',
	name: 'LoginPage',
	data() {
		return {
			user: {
				username: '',
				email: '',
				password: ''
			},
			errMsg: {}
		}
	},
	computed: {
		isLogin () {
			return this.$route.name === 'login'
		}
	},
	methods: {
		async submit() {
			try {
				if (this.isLogin) {
					const { data } = await toLogin({ user: this.user })
					console.log(data)
					// 将登录信息存入容器
					this.$store.commit('setUser', data.user)
					// 存储，防止刷新丢失
					Cookie.set('user', data.user)
				} else {
					await toRegist({ user: this.user })
				}
				this.$router.push('/')
			} catch(err) {
				console.dir(err)
				this.errMsg = err.response.data.errors
			}
			
		}
	}
}
</script>
<style>
	
</style>