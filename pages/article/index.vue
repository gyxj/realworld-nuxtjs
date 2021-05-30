<template>
	<div class="article-page">

	  <div class="banner">
	    <div class="container">

	      <h1>{{ article.title }}</h1>

	      <article-meta :article="article" />

	    </div>
	  </div>

	  <div class="container page">

	    <div class="row article-content">
	      <div class="col-md-12" v-html="article.body"></div>
	    </div>

	    <hr />

	    <div class="article-actions">
	      <article-meta :article="article" />
	    </div>

	    <div class="row">

	      <div class="col-xs-12 col-md-8 offset-md-2">

	        <article-comment :article="article" />
	        
	      </div>

	    </div>

	  </div>

	</div>
</template>
<script>
import ArticleMeta from '@/components/article-meta.vue'
import ArticleComment from '@/components/article-comment.vue'
import MarkdownIt from 'markdown-it'
import { getArticleDetail } from '@/api/article'
export default {
	name: 'ArticlePage',
	components: {
		ArticleMeta,
		ArticleComment
	},
	async asyncData({ params }) {
		const { data } = await getArticleDetail(params.slug)
		const { article } = data
		const md = new MarkdownIt()
		article.body = md.render(article.body)
		article.favoriteDisabled = false
		return {
			article
		}
	},
	head() {
		return {
			title: 'realworld - ' + this.article.title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.article.title
				}
			]
		}
	}
}
</script>
<style>
	
</style>