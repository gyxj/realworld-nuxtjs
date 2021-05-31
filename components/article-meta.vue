<template>
	<div class="article-meta">
    <nuxt-link :to="'/profile/' + article.author.username"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="'/profile/' + article.author.username" class="author">{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>

    <!-- 自己发表的文章 含有修改和删除的权限 -->
    <span v-if="isSelf">

      <nuxt-link 
        class="btn btn-outline-secondary btn-sm" 
        :to="{ name: 'editor', query: { slug: article.slug } }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm" @click="removeArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>

    </span>
    <!-- 其他权限 -->
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}" @click="followUser">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{article.author.username}} <span class="counter"></span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}"
        @click="favoriteClick(article)"
        :disabled="article.favoriteDisabled"
        >
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { addFollow, delFollow } from '@/api/user'
import { delArticle, addFavorite, delFavorite } from '@/api/article'
export default {
	name: 'ArticleMeta',
	props: ['article'],
  computed: {
    ...mapState(['user']),
    isSelf() {
      return this.article.author.username === this.user.username
    }
  },
  methods: {
    async followUser() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      const follow = this.article.author.following ? delFollow : addFollow
      await follow(this.article.author.username)
      this.article.author.following = !this.article.author.following
    },
    async removeArticle() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      await delArticle(this.article.slug)
      this.$router.push({ name: 'home', query: { tab: 'your_feed' } })
    },
    async favoriteClick(data) {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      data.favoriteDisabled = true
      if (data.favorited) {   // 取消点赞
        await delFavorite(data.slug)
        data.favorited = false
        data.favoritesCount -= 1
      } else {    // 添加点赞
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