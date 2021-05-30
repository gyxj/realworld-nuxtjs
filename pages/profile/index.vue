<template>
	<div class="profile-page">

	  <div class="user-info">
	    <div class="container">
	      <div class="row">

	        <div class="col-xs-12 col-md-10 offset-md-1">
	         	<img :src="profile.image" />
	          <h4>{{profile.username}} </h4>
	          <p>{{profile.bio}}</p>

	          <!-- 自己的个人中心 -->
	          <nuxt-link v-if="isUser" class="btn btn-sm btn-outline-secondary action-btn" 
	          	to="/setting">
	            <i class="ion-gear-a"></i> Edit Profile Settings
	          </nuxt-link>
	          <!-- 非自己的个人中心 -->
	          <button 
	          	v-else
	          	class="btn btn-sm btn-outline-secondary action-btn" 
	          	:class="{active: profile.following}"
	          	@click="followUser"
	          	>
	            <i class="ion-plus-round"></i>
	            &nbsp;
	            Follow {{profile.username}} 
	          </button>
	        </div>

	      </div>
	    </div>
	  </div>

	  <div class="container">
	    <div class="row">

	      <div class="col-xs-12 col-md-10 offset-md-1">
	        <div class="articles-toggle">
	          <ul class="nav nav-pills outline-active">
	            <li class="nav-item">
	              <nuxt-link 
	              	class="nav-link" 
	              	:class="{active: type === 'author'}"
	              	exact
	              	:to="{ name: 'profile', query: { type: 'author' } }"
	              >My Articles</nuxt-link>
	            </li>
	            <li class="nav-item">
	            	<nuxt-link 
	              	class="nav-link" 
	              	:class="{active: type === 'favorited'}"
	              	exact
	              	:to="{ name: 'profile', query: { type: 'favorited' } }"
	              >Favorited Articles</nuxt-link>
	            </li>
	          </ul>
	        </div>

	        <div class="article-preview" v-for="article in articles" :key="article.slug">
	          <div class="article-meta">
	            <nuxt-link
	            	:to="{name: 'profile', query: {page, type}}"
	            ><img :src="article.author.image" /></nuxt-link>
	            <div class="info">
		            <nuxt-link
	            		:to="{name: 'profile', query: {page, type}}"
		            >{{article.author.username}}</nuxt-link>
	              <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
	            </div>
	            <button 
	            	class="btn btn-outline-primary btn-sm pull-xs-right"
	            	:class="{ active: article.favorited }"
	            	@click="favoriteClick(article)"
	            	>
	              <i class="ion-heart"></i> {{article.favoritesCount}}
	            </button>
	          </div>
	          <nuxt-link :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
	            <h1>{{article.title}}</h1>
	            <p>{{article.description}}</p>
	            <span>Read more...</span>
	          </nuxt-link>
	        </div>

	        <!-- 分页 -->
	        <nav>
					  <ul class="pagination">
					    <li 
					    	class="page-item" :class="{active: page === item}"
					    	v-for="item in totalPage" :key="item"
					    >
					      <nuxt-link 
					      	class="page-link" 
					      	:to="{name: 'profile', query: {page: item, type}}"
					      >{{item}}</nuxt-link>
					    </li>
					  </ul>
					</nav>


	      </div>

	    </div>
	  </div>

	</div>
</template>
<script>
import { mapState } from 'vuex'
import { getProfile, addFollow, delFollow } from '@/api/user'
import { getArticles, addFavorite, delFavorite } from '@/api/article'
export default {
	name: 'ProfilePage',
	middleware: 'authenticated',
	watchQuery: ['type', 'page'],
	computed: {
		...mapState(['user']),
		isUser() {
			return this.user.username === this.profile.username
		},
		totalPage () {
			return Math.ceil(this.articlesCount / this.limit)
		}
	},
	async asyncData({ query, params }) {
		const page = Number.parseInt(query.page || 1)
		const limit = 10
		const offset = limit * (page - 1)
		// 获取用户信息 和 文章列表
		const type = query.type || 'author'
		let arg = null
		if (type === 'author') {
			arg = { author: params.username, limit, offset }
		} else {
			arg = { favorited: params.username, limit, offset }
		}

		const [ profileRes, articlesListRes ] = await Promise.all([
			getProfile(params.username),
			getArticles(arg)
		])

		const profile = profileRes.data.profile
		const articles = articlesListRes.data.articles
		const articlesCount = articlesListRes.data.articlesCount

		return {
			type,
			page,
			limit,
			profile,
			articles,
			articlesCount
		}
	},
	methods: {
		async followUser() {
			const follow = this.profile.following ? delFollow : addFollow
			await follow(this.profile.username)
			this.profile.following = !this.profile.following
		},
		async favoriteClick(data) {
			data.favoriteDisabled = true
			if (data.favorited) {		// 取消点赞
				await delFavorite(data.slug)
				data.favorited = false
				data.favoritesCount -= 1
			} else {		// 添加点赞
				await addFavorite(data.slug)
				data.favorited = true
				data.favoritesCount += 1
			}
			data.favoriteDisabled = false
		}
	}
}
</script>
<style>
	
</style>