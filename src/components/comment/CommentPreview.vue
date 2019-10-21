<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <router-link class="comment-author" :to="'/@'+comment.author.username">
        <img :src="comment.author.image" class="comment-author-img" />
      </router-link>&nbsp;
      <router-link
        class="comment-author"
        :to="'/@'+comment.author.username"
      >{{comment.author.username}}</router-link>
      <span class="date-posted">{{comment.createdAt}}</span>
      <span class="mod-options" @click="deleteComment()" v-if="comment.author.username==user.username">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Comment } from '../../store/models';
import articles from '@/store/modules/articles';
import users from '@/store/modules/users';

@Component
export default class CommentPreview extends Vue {
  @Prop() public comment?: Comment;

  get user() {
    return users.user || {};
  }
  public deleteComment() {
    if (window.confirm('Do you really want to delete this comment?')) {
    if (articles.article && this.comment) {
      articles.deleteComment({
        id: this.comment.id,
        slug: articles.article.slug,
      });
    }
  }
  }
}
</script>