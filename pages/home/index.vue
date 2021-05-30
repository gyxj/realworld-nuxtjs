<template>
	<div class="home-page">

	  <div class="banner">
	    <div class="container">
	      <h1 class="logo-font">conduit</h1>
	      <p>A place to share your knowledge.</p>
	    </div>
	  </div>

	  <div class="container page">
	    <div class="row">

	      <div class="col-md-9">
	        <div class="feed-toggle">
	          <ul class="nav nav-pills outline-active">
	            <li class="nav-item">
	            	<!-- exact 开启精确匹配 -->
	              <nuxt-link 
	              	class="nav-link" :class="{active: tab === 'your_feed'}" 
	              	exact
	              	:to="{name: 'home', query: {tab: 'your_feed'}}" v-if="user"
	              	>Your Feed
	            	</nuxt-link>
	            </li>
	            <li class="nav-item">
	              <nuxt-link 
	              	class="nav-link" :class="{active: tab === 'global_feed'}" 
	              	exact
	              	:to="{name: 'home', query: {tab: 'global_feed'}}"
	              	>Global Feed
	             	</nuxt-link>
	            </li>
	            <li class="nav-item">
	              <nuxt-link 
	              	v-if="tag"
	              	class="nav-link" :class="{active: tab === 'tag'}" 
	              	exact
	              	:to="{ name: 'home', query: {tab: 'tag', tag }}"
	              	>#{{tag}}
	             	</nuxt-link>
	            </li>
	          </ul>
	        </div>

	        <div class="article-preview" v-for="item in articles" :key="item.slug">
	          <div class="article-meta">
	            <nuxt-link 
	            	:to="{ name: 'profile', params: { username: item.author.username } }"
	            	><img :src="item.author.image" />
	            </nuxt-link>
	            <div class="info">
	              <nuxt-link 
	              	:to="{ name: 'profile', params: { username: item.author.username } }" 
	              	class="author"
	              >{{item.author.username}}</nuxt-link>
	              <span class="date">{{item.createdAt | date('MMM DD,YYYY')}}</span>
	            </div>
	            <button 
	            	class="btn btn-outline-primary btn-sm pull-xs-right"
	            	:class="{ active: item.favorited }"
	            	@click="favoriteClick(item)"
	            	:disabled="item.favoriteDisabled"
	            	>
	              <i class="ion-heart"></i> {{item.favoritesCount}}
	            </button>
	          </div>
	          <nuxt-link :to="{name: 'article', params: {slug: item.slug}}" class="preview-link">
	            <h1>{{item.title}}</h1>
	            <p>{{item.description}}</p>
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
					      	:to="{name: 'home', query: {page: item, tag, tab}}"
					      >{{item}}</nuxt-link>
					    </li>
					  </ul>
					</nav>

	      </div>
	     	<!-- 标签tags -->
	      <div class="col-md-3">
	        <div class="sidebar">
	          <p>Popular Tags</p>

	          <div class="tag-list">
	            <nuxt-link 
	            	class="tag-pill tag-default active" 
	            	:to="{ name: 'home', query: { tab: 'tag', tag: item } }"  
	            	v-for="item in tags" :key="item"
	            	>{{item}}
	            </nuxt-link>
	          </div>
	        </div>
	      </div>

	    </div>
	  </div>

	</div>
</template>
<script>
import { getTags } from '@/api/tags'
import { getArticles, getFeedArticles, addFavorite, delFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
	name: 'HomePage',
	computed: {
		...mapState(['user']),
		totalPage () {
			return Math.ceil(this.articlesCount / this.limit)
		}
	},
	watchQuery: ['page', 'tag', 'tab'],
	async asyncData({ query, store }) {
		const page = Number.parseInt(query.page || 1)
		const limit = 20
		const offset = limit * (page - 1)
		const tab = query.tab || 'global_feed'
		const { tag } = query
		const loadArticles = store.state.user && tab === 'your_feed' 
			? getFeedArticles
			: getArticles
		const [data, artcleData] = await Promise.all([
			getTags(),
			loadArticles({ limit, offset, tag })
		])
		const tags = data.data.tags
		const { articles, articlesCount } = artcleData.data
		articles.forEach(item => item.favoriteDisabled = false)
		return {
			tab,
			tag,
			page,
			limit,
			tags,
			articles,
			articlesCount
		}
	},
	methods: {
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