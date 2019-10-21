<template>
    <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <router-link class="nav-link" to="/login">
            Have an account?
            </router-link>
        </p>

        <ul class="error-messages" v-if="signupError">
          <li>{{signupError}}</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
          </fieldset>
          <button @click="register()" class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '@/store/modules/users';

@Component
export default class Register extends Vue {
  public email = '';
  public password = '';
  public username = '';
  public signupError = '';

public created() {
  if (users.isAuthenticated) {
    users.alreadyLoggedInUser();
    this.$router.push('/');
  }
}
  public async register() {
    await users.CreateUser({
        username: this.username,
        email: this.email,
        password: this.password,
    }).then(() => this.$router.push('/'))
    .catch((err) => {
    console.log(err);
    this.signupError = 'Error while creating user. Please try again 2.';
    });
  }
}
</script>