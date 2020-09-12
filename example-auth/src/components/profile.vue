<template>
  <div>
      <h2>Logged In!</h2>
      <h1>{{userprofile.name}}</h1>
      <p>{{userprofile.email}}</p>
      <p>ID: {{userprofile.$id}}</p>
      <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: ['userprofile'],
  methods: {
    logout() {
        this.$parent.logout()
    }
  }
}
</script>
