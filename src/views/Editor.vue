<template>
    <div class="editor-page">
  <div class="container page">
    <div class="row">

      <ul class="error-messages" v-if="loginError">
          <li>{{loginError}}</li>
        </ul>
      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button @click="submitArticle()" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '@/store/modules/users';
import { NewArticle } from '@/store/models';
import articles from '@/store/modules/articles';

@Component
 export default class Editor extends Vue {
  public article: NewArticle = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    slug: '',
  };
  public loginError = '';
  public tagList: string = '';

  public async created() {
    users.alreadyLoggedInUser();
    if (!this.isAuthenticated) {
        this.$router.push({ name: 'login' });
        return;
      }

    if (this.$route.params.slug) {
      articles.getArticle(this.$route.params.slug).then(() => {
        if (articles != null && articles.article) {
          this.article.slug = articles.article.slug;
          this.article.title = articles.article.title;
          this.article.description = articles.article.description;
          this.article.body = articles.article.body;
          this.tagList =
            articles.article.tagList != null
              ? articles.article.tagList.toString()
              : '';
        }
      });
    }
    // this.user = users.user || {};
  }

  public async submitArticle() {
    if (this.article != null) {
      this.article.tagList = this.tagList.split(',').filter((x) => x.trim.length != 0);
    }

    if (this.article.slug == null || this.article.slug == '') {
    await articles.CreateArticle(this.article)
    .then(() => this.$router.push('/'))
    .catch((error) => {
    // console.log(err);
    this.loginError = 'Error while creating new article. Please try again';
    });
    } else {
      await articles.EditArticle(this.article)
      .then(() => {
          if (articles.article != null) {
            this.$router.push(`/article/${articles.article.slug}`);
          }
        })
      .catch(() => {});

     }

  }

  get isAuthenticated() {
    return users.isAuthenticated;
  }
 }
</script>