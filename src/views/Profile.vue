<template>
    <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img v-if="profile.image" :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p v-if="profile.bio">
            {{profile.bio}}
          </p>
          <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                to="/settings">
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-secondary action-btn"
                v-if="profile.following && username != profile.username"
                @click="followUser()"
              >
                <i class="ion-plus-round"></i> &nbsp;Unfollow
                {{ profile.username }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
              v-if="!profile.following && username != profile.username"
                @click="followUser()"
              >
                <i class="ion-plus-round"></i> &nbsp;Follow
                {{ profile.username }}
              </button>
            </div>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a
                  class="nav-link"
                  @click="MyArticles()"
                  v-bind:class="{active:tab=='myarticle'}"
                >My Articles</a>
            </li>
            <li class="nav-item">
              <a
                  class="nav-link"
                  @click="favoriteArticle()"
                  v-bind:class="{active:tab!='myarticle'}"
                >Favorited Articles</a>
            </li>
          </ul>
        </div>

        <ArticlePreview v-for="article in Feed" :article="article" :key="article.slug"></ArticlePreview>

      </div>

    </div>
  </div>

</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ArticlePreview from '@/components/article/ArticlePreview.vue';
import users from '@/store/modules/users';
import articles from '@/store/modules/articles';
import { Article } from '@/store/models';

@Component({
  components: {
    ArticlePreview,
  },
})
export default class Profile extends Vue {

  get profile() {
    return users.profile || { following: false, username: '' };
  }

  get username() {
    return users.username || '';
  }
  public Feed: Article[] = [];
  public tab: string = 'myarticle';

  public created() {
    users.loadProfile(this.$route.params.username).then(() =>
      this.MyArticles(),
    );

  }

  public isCurrentUser() {
      if (users.user && users.profile) {
        return users.user.username === users.profile.username;
      }
      return false;
    }

  public MyArticles() {
    this.tab = 'myarticle';
    this.getFeed('author');
  }

  public favoriteArticle() {
    this.tab = 'favoritedarticle';
    this.getFeed('favorited');
  }

  public followUser() {
    if (!this.profile.following) {
      users.follow(this.profile.username);
    } else {
      users.unfollow(this.profile.username);
    }
  }

  private getFeed(query: string) {
    if (users.profile) {
      articles
        .getFeedByQuery(query + '=' + users.profile.username)
        .then(() => (this.Feed = articles.globalFeed));
    }
  }

}
</script>