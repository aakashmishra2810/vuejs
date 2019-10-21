<template>
    <div class="article-preview">
          <div class="article-meta">
            <router-link href="profile.html" :to="'/@' + article.author.username"><img :src="article.author.image" /></router-link>
            <div class="info">
              <router-link href=""  :to="'/@' + article.author.username" class="author">{{article.author.username}}</router-link>
              <span class="date">{{article.createdAt}}</span>
            </div>
            <button class="btn btn-primary btn-sm pull-xs-right" @click="favoriteArticle()" v-if="article.favorited">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
            <button class="btn btn-outline-primary btn-sm pull-xs-right" @click="favoriteArticle()" v-if="!article.favorited">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <router-link href="preview-link" :to="'/article/'+article.slug" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </router-link>
     </div>      
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Article } from '@/store/models';
import articles from '@/store/modules/articles';

@Component
 export default class ArticlePreview extends Vue {
  @Prop() public article?: Article;

  public favoriteArticle() {
    if (this.article && this.article.favorited) {
      console.log('make unfav');
      articles.UnfavoriteArticleByHeart(this.article.slug);
    }
    if (this.article && !this.article.favorited) {
      console.log('make fav');
      articles.favoriteArticleByHeart(this.article.slug);
    }
  }
 }
</script>