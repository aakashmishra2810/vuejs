<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <router-link :to="'/@'+article.author.username">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="'/@'+article.author.username"
              class="author"
            >{{article.author.username}}</router-link>
            <span class="date">{{article.createdAt}}</span>
          </div>
          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="article.author.username!=user.username && !profile.following"
            @click="followUser()"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          <button
            class="btn btn-sm btn-secondary"
            v-if="article.author.username!=user.username  && profile.following"
            @click="followUser()"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Unfollow {{article.author.username}}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-primary"
            v-if="article.author.username!=user.username && article.favorited"
            @click="favoriteArticle()"
          >
            <i class="ion-heart"></i>
            &nbsp;
            UnFavorite Article
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="article.author.username!=user.username && !article.favorited"
            @click="favoriteArticle()"
          >
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Article
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          <router-link
            class="btn btn-sm btn-outline-secondary"
            v-if="article.author.username==user.username"
            :to="'/editor/'+article.slug"
          >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </router-link>&nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-danger"
            v-if="article.author.username==user.username"
            @click="deleteArticle()"
          >
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
            <span class="counter"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{article.body}}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <router-link :to="'/@'+article.author.username">
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="'/@'+article.author.username"
              class="author"
            >{{article.author.username}}</router-link>
            <span class="date">{{article.createdAt}}</span>
          </div>

          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="article.author.username!=user.username && !profile.following"
            @click="followUser()"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}}
          </button>
          <button
            class="btn btn-sm btn-secondary"
            v-if="article.author.username!=user.username  && profile.following"
            @click="followUser()"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Unfollow {{article.author.username}}
          </button>
          &nbsp;&nbsp;
          <button
            class="btn btn-sm btn-primary"
            v-if="article.author.username!=user.username && article.favorited"
            @click="favoriteArticle()"
          >
            <i class="ion-heart"></i>
            &nbsp;
            UnFavorite Article
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="article.author.username!=user.username && !article.favorited"
            @click="favoriteArticle()"
          >
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Article
            <span
              class="counter"
            >({{article.favoritesCount}})</span>
          </button>
          <router-link
            class="btn btn-sm btn-outline-secondary"
            v-if="article.author.username==user.username"
            :to="'/editor/'+article.slug"
          >
            <i class="ion-edit"></i>
            &nbsp;
            Edit Article
          </router-link>&nbsp;&nbsp;
          <button
            class="btn btn-sm btn-outline-danger"
            v-if="article.author.username==user.username"
            @click="deleteArticle()"
          >
            <i class="ion-trash-a"></i>
            &nbsp;
            Delete Article
            <span class="counter"></span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2" v-if="user.username">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment.body"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <a class="btn btn-sm btn-primary" @click="postComment()">Post Comment</a>
            </div>
          </form>
          <CommentPreview v-for="comment in comments" :comment="comment" :key="comment.id" ></CommentPreview>
        </div>
        <div class="col-xs-12 col-md-8 offset-md-2" v-if="!user.username">
          <router-link to="/login"> Sign in </router-link> or <router-link to="/register">sign up </router-link>to add comments on this article.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import articles from '@/store/modules/articles';
import CommentPreview from '@/components/comment/CommentPreview.vue';
import users from '@/store/modules/users';
import {
  Comment,
  Article as ArticleModel,
  NewComment,
} from '../store/models';

@Component({
  components: {
    CommentPreview,
  },
})
export default class Article extends Vue {
  public comments?: Comment[] = [];
  // article?: ArticleModel | null = {
  //   slug: "",
  //   title: "",
  //   description: "",
  //   body: "",
  //   tagList: [],
  //   createdAt: "",
  //   updatedAt: "",
  //   favorited: false,
  //   favoritesCount: 0,
  //   author: {
  //     username: "",
  //     bio: "",
  //     image: "",
  //     following: false
  //   }
  // };

  public comment: NewComment = {
    body: '',
    slug: '',
  };

  public created() {
    users.alreadyLoggedInUser();
    articles
      .getArticle(this.$route.params.slug)
      .then(() => (this.article = articles.article));
    articles
      .getComments(this.$route.params.slug)
      .then(() => (this.comments = articles.comments));
  }

  get profile() {
    return users.profile || { following: false };
  }

  get article() {
    return articles.article || { slug: '', author: { username: '' }, favorited: false };
  }
  get user() {
    return users.user || {};
  }

  public postComment() {
    if (this.article) {
      this.comment.slug = this.article.slug;
      articles.createComment(this.comment).then(() => (this.comment.body = ''));
    }
  }

  public async deleteArticle() {
    if (window.confirm('Do you really want to delete this article?')) {
    if (this.article) {
     await articles
        .deleteArticle(this.article.slug)
        .then(() => this.$router.push('/'));
    }
    }
  }

  public favoriteArticle() {
    if (!this.article.favorited) {

      articles.favoriteArticle(this.article.slug);
    } else {
      articles.unFavoriteArticle(this.article.slug);
    }
  }

  public followUser() {
    if (!this.profile.following) {
      users.follow(this.article.author.username);
    } else {
      users.unfollow(this.article.author.username);
    }
  }
}
</script>