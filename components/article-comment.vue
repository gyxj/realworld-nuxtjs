<template>
	<div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" v-model="content" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="addComment">
         Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="(comment, index) in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link 
          :to="{name: 'profile', params: {username: comment.author.username}}" 
          class="comment-author"
          >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link 
          :to="{name: 'profile', params: {username: comment.author.username}}" 
          class="comment-author"
        >{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
        <span class="mod-options" v-if="user.username === comment.author.username">
          <i class="ion-trash-a" @click="delComment(comment.id, index)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleComment, delArticleComment, addArticleComment } from '@/api/article'
import { mapState } from 'vuex'
export default {
	name: 'ArticleMeta',
	props: ['article'],
  data() {
    return {
      comments: [],
      content: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted() {
    const { data } = await getArticleComment(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async delComment(id, index) {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      await delArticleComment(this.article.slug, id)
      this.comments.splice(index, 1)
    },
    async addComment() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      const obj = { comment: { body: this.content } }
      const { data } = await addArticleComment(this.article.slug, obj)
      this.comments.unshift(data.comment)
      this.content = ''
    }
  }
}
</script>
<style>
	
</style>