<template>
  <div>
    <h1>Register</h1>
    <p v-if="error" class="error">{{error}}</p>
    <form @submit="processRegister">
        <input v-model="username" type="text" id="email" required placeholder="Username">
        <input v-model="email" type="email" id="email" required placeholder="Email">
        <input v-model="password" type="password" id="password" required placeholder="Password">
        <input v-model="confirmPassword" type="password" id="password" required placeholder="Confirm Password">
        <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data: () => {
    return {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: '',
    error: false
  }},
  methods: {
    async processRegister(e) {
      e.preventDefault()

      // Validation

      if (this.loading) { return }

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

      if (await this.$parent.register(this.username, this.password, this.email) === false) {
        this.error = 'Something went wrong while registering, Check console for more details.'
      }
    }
  }
}
</script>
