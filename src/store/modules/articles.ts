import { VuexModule, Module, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators';
import store from '@/store';
import { Article, Comment, NewArticle, NewComment, DeleteComment } from '../models';
import * as api from '@/store/api';
type FeedType = 'global' | 'user';

@Module({
    namespaced: true,
    name: 'articles',
    store,
    dynamic: true,
})
class ArticlesModule extends VuexModule {
    public globalFeed: Article[] = [];
    public userFeed: Article[] = [];
    public article?: Article | null = null;
    public tags?: string[] | null = [];
    public comments?: Comment[] = [];

    @Mutation
    public setGlobalFeed(articles: Article[]) {
        this.globalFeed = articles;
    }

    @Mutation
    public setFeed(articles: Article[]) {
        this.globalFeed = articles;
    }

    @Mutation
    public setArticle(article: Article) {
        this.article = article;
    }

    @Mutation
    public setComments(comments: Comment[]) {
        this.comments = comments;
    }

    @Mutation
    public addComment(comment: Comment) {
        if (this.comments) {
            this.comments = this.comments.splice(0, 0, comment);
        }
    }

    @Mutation
    public removeComment(id: number) {
        if (this.comments) {
            this.comments.splice(this.comments.findIndex((x) => x.id == id), 1);
        }
    }

    @Mutation
    public setTags(tags: string[]) {
        this.tags = tags;
    }

    @Mutation
    public updateFeed(article: Article) {
        this.globalFeed.splice(this.globalFeed.findIndex((x) => x.slug == article.slug), 1, article);
    }

    @Action({commit: 'setGlobalFeed'})
    public async refreshGlobalFeed() {
        const globalFeed = await api.getGlobalFeed();
        return globalFeed.articles;
    }

    @Action({ commit: 'setFeed' })
    public async refreshFeed(feed: FeedType) {
        if (feed == 'global') {
            const response = await api.getGlobalFeed();
            return response.articles;
        } else {
            const response = await api.getFeedByUser();
            return response.articles;
        }
    }

    @Action({ commit: 'setGlobalFeed' })
    public async getFeedByQuery(query: string) {
        const response = await api.getArticleByQuery(query);
        return response.articles;
    }

    @Action({ commit: 'setArticle' })
    public async getArticle(slug: string) {
        const response = await api.getArticleBySlug(slug);
        return response.article;
    }

    @Action({ commit: 'setArticle' })
    public async CreateArticle(newArticle: NewArticle) {
        try {
            const article = await api.CreateNewArticle(newArticle);
            return article;
        } catch (error) {
            throw new Error('Error while creating new article. Please try again');
        }

    }

    @Action({ commit: 'setArticle' })
    public async EditArticle(article: NewArticle) {
        const response = await api.EditArticle(article);
        return response.article;
    }

    @Action({})
    public async deleteArticle(slug: string) {
        await api.deleteArticle(slug);
    }

    @Action({ commit: 'setComments' })
    public async getComments(slug: string) {
        const response = await api.getComments(slug);
        return response.comments;
    }

    @Action({ commit: 'addComment' })
    public async createComment(comment: NewComment) {
        const response = await api.createComment(comment);
        return response.comment;
    }

    @Action({ commit: 'removeComment' })
    public async deleteComment(comment: DeleteComment) {
        await api.deleteComment(comment);
        return comment.id;
    }

    @Action({ commit: 'setTags' })
    public async getTags() {
        const response = await api.getTags();
        return response.tags;
    }

    @Action({ commit: 'setArticle' })
    public async favoriteArticle(slug: string) {
        const response = await api.favoriteArticle(slug);
        return response.article;
    }

    @Action({ commit: 'setArticle' })
    public async unFavoriteArticle(slug: string) {
        const response = await api.unFavoriteArticle(slug);
        return response.article;
    }


    @Action({ commit: 'updateFeed' })
    public async favoriteArticleByHeart(slug: string) {
            const response = await api.favoriteArticle(slug);
            return response.article;
    }

    @Action({ commit: 'updateFeed' })
    public async UnfavoriteArticleByHeart(slug: string) {
        const response = await api.unFavoriteArticle(slug);
        return response.article;

    }
}

export default getModule(ArticlesModule);
