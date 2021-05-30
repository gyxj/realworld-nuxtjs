<template>
	<div class="settings-page">
	  <div class="container page">
	    <div class="row">

	      <div class="col-md-6 offset-md-3 col-xs-12">
	        <h1 class="text-xs-center">Your Settings</h1>

	        <form @submit.prevent="submit">
	          <fieldset>
	              <fieldset class="form-group">
	                <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture">
	              </fieldset>
	              <fieldset class="form-group">
	                <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name" required>
	              </fieldset>
	              <fieldset class="form-group">
	                <textarea class="form-control form-control-lg" rows="8" v-model="user.bio" placeholder="Short bio about you"></textarea>
	              </fieldset>
	              <fieldset class="form-group">
	                <input class="form-control form-control-lg" v-model="user.email" type="text" placeholder="Email" required>
	              </fieldset>
	              <fieldset class="form-group">
	                <input class="form-control form-control-lg" v-model="user.password" type="password" minlength="8"  placeholder="Password">
	              </fieldset>
	              <button class="btn btn-lg btn-primary pull-xs-right">
	                Update Settings
	              </button>
	              <div style="height: 50px;"></div>
	              <hr>
	              <button class="btn btn-outline-danger" @click.prevent="logout()">
				          Or click here to logout.
				        </button>
	          </fieldset>
	        </form>
	      </div>

	    </div>
	  </div>
	</div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { getUserInfo, opdateUserInfo } from '@/api/user'
export default {
	middleware: 'authenticated',
	name: 'SettingPage',
	data() {
		return {
			user: {}
		}
	},
	async mounted() {
		const { data } = await getUserInfo()
		this.user = data.user
	},
	methods: {
		logout() {
			// 将登录信息从容器删除
			this.$store.commit('delUser')
			// 删除存储
			Cookie.remove('user') 
			this.$router.push('/')
		},
		async submit() {
			const data = {
				user: {
					bio: this.user.bio, 
					email: this.user.email, 
					image: this.user.image, 
					username: this.user.username, 
					password: this.user.password
				}
			}
			await opdateUserInfo(data)
			this.$router.push({ name: 'profile', params: { username: this.user.username } })
		}
	}
}
</script>
<style>
	
</style>