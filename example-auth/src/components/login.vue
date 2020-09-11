<template>
  <div>
    <h1>Login</h1>
    <p v-if="error" class="error">{{error}}</p>
    <form @submit="processLogin">
      <input v-model="email" type="email" id="email" required placeholder="Email">
      <input v-model="password" type="password" id="password" required placeholder="Password">
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
    email: '',
    password: '',
    error: false
  }},
  methods: {
    async processLogin(e) {
      e.preventDefault()

      this.error = false;

      // Validation
      if (!(this.password.length >= 6 && this.password.length <= 32)) {
        this.error = 'Error: Password must be between 6 and 32 characters.';
        return;
      }

      if (await this.$parent.login(this.email, this.password) === false) {
        this.error = 'Incorrect Credentials!'
      }
    }
  }
}
</script>