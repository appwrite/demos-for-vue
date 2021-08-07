<template>
  <div>
    <h1>Login</h1>
    <p v-if="error" class="error">{{error}}</p>
    <form @submit.prevent="processLogin">
      <input v-model="email" type="email" required placeholder="Email">
      <input v-model="password" type="password" required placeholder="Password">
      <button type="submit">Sign In</button>
    </form>
    <div class="loginSwitchContainer">
      <p>Haven't got an account?</p>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import client from "../appwrite";

export default {
  name: 'Login',
  data()  {
    return {
      email: '',
      password: '',
      error: false
    }},
  methods: {
    async processLogin() {
      this.error = false;

      // Validation
      if (!(this.password.length >= 6 && this.password.length <= 32)) {
        this.error = 'Error: Password must be between 6 and 32 characters.';
        return;
      }

      const error = await client.account.createSession(this.email, this.password).then(() => {}, (err) => {
        return err;
      });

      console.log(error);

      if (error) {
        this.error = 'Incorrect Credentials!'
      } else {
        await this.$router.push('/home');
      }
    }
  }
}
</script>
