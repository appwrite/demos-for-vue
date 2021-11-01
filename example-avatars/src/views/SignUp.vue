<template>
  <div>
    <h1>Register</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="processRegister">
      <input v-model="username" type="text" required placeholder="Username">
      <input v-model="email" type="email" required placeholder="Email">
      <input v-model="password" type="password" required placeholder="Password">
      <input v-model="confirmPassword" type="password" required placeholder="Confirm Password">
      <button type="submit">Register</button>
    </form>
    <div class="loginSwitchContainer">
      <p>Got an account?</p>
      <router-link to="/">Login</router-link>
    </div>
  </div>
</template>

<script>
import client from "../appwrite";

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: '',
      error: false
    }
  },
  methods: {
    async processRegister() {
      // Validation

      if (this.loading) {
        return
      }

      // Password confirmation
      if (this.password !== this.confirmPassword) {
        this.error = 'Error: Passwords must be matching.';
        return;
      }

      // Length Validation
      if (!(this.password.length >= 6 && this.password.length <= 32)) {
        this.error = 'Error: Password must be between 6 and 32 characters.';
        return;
      }

      if (this.username.length >= 100) {
        this.error = 'Error: Username can not exceed 100 characters';
        return;
      }

      this.loading = true;

      const error = client.account.create(this.email, this.password, this.username).catch((err) => {
        return err;
      });

      console.log(error);

      if (error) {
        this.error = 'Something went wrong while registering, Check console for more details.'
      } else {
        await this.$router.push('/home')
      }
    }
  }
}
</script>
