<template>
	<div>
		<!-- 顶部导航 -->
		<nav class="navbar navbar-light">
	    <div class="container">
	      <router-link class="navbar-brand" to="/">conduit</router-link>
	      <ul class="nav navbar-nav pull-xs-right">
	        <li class="nav-item">
	          <!-- Add "active" class when you're on that page" -->
	          <router-link class="nav-link" exact to="/">Home</router-link>
	        </li>
	        <template v-if="user">
	        	<li class="nav-item">
		          <router-link class="nav-link" to="/editor">
		            <i class="ion-compose"></i>&nbsp;New Post
		          </router-link>
		        </li>
		        <li class="nav-item">
		          <router-link class="nav-link" to="/setting">
		            <i class="ion-gear-a"></i>&nbsp;Settings
		          </router-link>
		        </li>
		        <li class="nav-item">
		          <router-link class="nav-link" :to="{name: 'profile', params: {username: user.username}}">{{user.username}}</router-link>
		        </li>
	        </template>
		      <template v-else>
		      	<li class="nav-item">
		          <router-link class="nav-link" to="/login">Sign up</router-link>
		        </li>
		        <li class="nav-item">
		          <router-link class="nav-link" to="/regist">Sign in</router-link>
		        </li>
		      </template>
	      </ul>
	    </div>
	  </nav>

	  <!-- 子路由 -->
	  <nuxt-child />

	  <!-- 底部 -->
	  <footer>
	    <div class="container">
	      <router-link to="/home" class="logo-font">conduit</router-link>
	      <span class="attribution">
	        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
	      </span>
	    </div>
	  </footer>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'LayoutPage',
	computed: {
		...mapState(['user'])
	}
}
</script>
<style>
	
</style>