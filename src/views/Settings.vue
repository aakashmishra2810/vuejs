<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button @click="updateProfile()" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr />
          <button @click="logout" class="btn btn-outline-danger">
            Or click here to logout.
          </button>
      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '@/store/modules/users';
import { User } from '@/store/models';

@Component
 export default class Settings extends Vue {
  public user: Partial<User> = {};
  public password: string = '';
  public async created() {
    if (!this.isAuthenticated) {
        this.$router.push({ name: 'login' });
        return;
      }
    this.user = users.user || {};
  }

  public async updateProfile() {
    await users.UpdateProfile({
      email: this.user.email,
      bio: this.user.bio,
      image: this.user.image,
      username: this.user.username,
      password: this.password,
    });
    this.user = users.user || {};
    this.$router.push('/');

  }

  public async logout() {
    await users.Logout();
    this.$router.push('/');

  }

  get isAuthenticated() {
    return users.isAuthenticated;
  }

 }
</script>