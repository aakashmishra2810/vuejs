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
              <a class="nav-link" @click="GetMyFeed()" v-bind:class="{active:tab=='user', disabled:!username}">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="GetGlobalFeed()" v-bind:class="{active:tab=='global'}">Global Feed</a>
            </li>
            <!-- <li class="nav-item" v-if="tab!='global'&&tab!='user'">
                <a class="nav-link" v-bind:class="{active:tab!='global'&&tab!='user'}">#{{tab}}</a>
              </li> -->
          </ul>
        </div>

        <ArticlePreview 
        v-for="article in feed"
        :article="article"
        :key="article.slug"
        ></ArticlePreview>        
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <a class="tag-pill tag-default" @click="filterByTag(tag)" v-for="tag in tags" :key="tag">{{tag}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticlePreview from '@/components/article/ArticlePreview.vue';
import articles from '@/store/modules/articles';
import { Article } from '@/store/models';
import users from '@/store/modules/users';

@Component({
  components: {
    ArticlePreview,
  },
})
 export default class Home extends Vue {
  public feed: Article[] = [];
  public tags?: string[] | null = [];
  public tab: string = '';

  public created() {
    users.alreadyLoggedInUser();
    articles.refreshGlobalFeed().then(() => {
      this.feed = articles.globalFeed;
    });
    articles.getTags().then(() => (this.tags = articles.tags));
  }

public GetMyFeed() {
    if (!this.username) { return; }
    this.tab = 'user';
    articles.refreshFeed('user').then(() => {
      this.feed = articles.globalFeed;
    });
  }

  public GetGlobalFeed() {
    this.tab = 'global';
    articles.refreshFeed('global').then(() => {
      this.feed = articles.globalFeed;
    });
  }

  public filterByTag(tag: string) {
    this.tab = 'global';
    articles.getFeedByQuery('tag=' + tag).then(() => {
      this.feed = articles.globalFeed;
    });
  }

  get username() {
    return users.username;
  }
 }
</script>