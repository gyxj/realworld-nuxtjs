import { request } from '@/plugins/request'

// 获取全部文章列表
export const getArticles = params => {
	return request({
		method: 'GET',
		url:'/api/articles',
		params
	})
}
// 获取关注的文章列表
export const getFeedArticles = params => {
	return request({
		method: 'GET',
		url:'/api/articles/feed',
		params
	})
}

// 文章点赞
export const addFavorite = params => {
	return request({
		method: 'POST',
		url:`/api/articles/${params}/favorite`
	})
}

// 文章取消点赞
export const delFavorite = slug => {
	return request({
		method: 'DELETE',
		url:`/api/articles/${slug}/favorite`
	})
}

// 获取文章的详情
export const getArticleDetail = slug => {
	return request({
		method: 'GET',
		url:`/api/articles/${slug}`
	})
}

// 发表文章评论
export const addArticleComment = (slug, data) => {
	return request({
		method: 'POST',
		url:`/api/articles/${slug}/comments`,
		data
	})
}

// 获取文章的评论列表
export const getArticleComment = slug => {
	return request({
		method: 'GET',
		url:`/api/articles/${slug}/comments`
	})
}

// 删除文章的评论
export const delArticleComment = (slug, id) => {
	return request({
		method: 'DELETE',
		url:`/api/articles/${slug}/comments/${id}`
	})
}

// 发表文章
export const createArticle = data => {
	return request({
		method: 'POST',
		url:`/api/articles`,
		data
	})
}

// 修改文章
export const updateArticle = (slug, data) => {
	return request({
		method: 'PUT',
		url:`/api/articles/${slug}`,
		data
	})
}

// 删除文章
export const delArticle = slug => {
	return request({
		method: 'DELETE',
		url:`/api/articles/${slug}`
	})
}
