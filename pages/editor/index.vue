<template>
	<div class="editor-page">
	  <div class="container page">
	    <div class="row">

	      <div class="col-md-10 offset-md-1 col-xs-12">
	        <form autocomplete="off" @submit.prevent="onSubmit" onkeydown="if(event.keyCode==13){return false;}">
	          <fieldset>
	            <fieldset class="form-group">
	                <input type="text" class="form-control form-control-lg" v-model="article.title" placeholder="Article Title" required>
	            </fieldset>
	            <fieldset class="form-group">
	                <input type="text" class="form-control" v-model="article.description" placeholder="What's this article about?" required>
	            </fieldset>
	            <fieldset class="form-group">
	                <textarea class="form-control" rows="8" v-model="article.body" placeholder="Write your article (in markdown)" required></textarea>
	            </fieldset>
	            <fieldset class="form-group">
	                <input type="text" class="form-control" v-model="tag" placeholder="Enter tags" @keyup.enter="addTag"><div class="tag-list"></div>
	            </fieldset>

	            <span v-for="(tag, index) in article.tagList" class="tag-default tag-pill">
                <i class="ion-close-round" style="cursor: pointer;" @click="removeTag(index)"></i>
                {{tag}}
              </span>

	            <button class="btn btn-lg pull-xs-right btn-primary">
	                Publish Article
	            </button>
	          </fieldset>
	        </form>
	      </div>

	    </div>
	  </div>
	</div>
</template>
<script>
import { createArticle, getArticleDetail, updateArticle } from '@/api/article'
export default {
	// 路由匹配组件渲染之前先 执行中间件处理
	middleware: 'authenticated',
	name: 'EditorPage',
	data() {
		return {
			article: { tagList: [] },
			tag: ''
		}
	},
	async created() {
		if (this.$route.query.slug) {
			const { data } = await getArticleDetail(this.$route.query.slug)
			this.article = data.article
		}
	},
	methods: {
		// 提交信息
		async onSubmit(e) {
			const obj = { article: this.article }
			let slug
			if (this.$route.query.slug) {		// 修改文章
				const { data: res } = await updateArticle(this.$route.query.slug, obj)
				slug = res.article.slug
			} else {			// 创建文章
				const { data: res } = await createArticle(obj)
				slug = res.article.slug
			}
			this.$router.push({ name: 'article', params: { slug } })
		},
		// 删除标签
		removeTag(index) {
			this.article.tagList.splice(index, 1)
		},
		// 增加标签
		addTag() {
			this.article.tagList.push(this.tag)
			this.tag = ''
		}
	}
}
</script>
<style>
	
</style>