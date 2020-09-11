<template>
  <div class="loginCore">
    <div class="loginPage" v-if="!userprofile">
      <Login v-if="!currentPage" />
      <Register v-if="currentPage" />
      <div class="loginSwitchContainer">
        <p>{{currentPage ? 'Got an account?' : "Haven't got an account?"}}</p>
        <span @click='() => this.currentPage = !this.currentPage'>{{currentPage ? 'Login' : 'Sign Up'}}</span>
      </div>
    </div>
    <div class="loginPage" v-if="userprofile">
      <Profile v-bind:userprofile='userprofile' />
    </div>
  </div>
</template>

<script>
import { appwrite } from './utils'

// Pages
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'

export default {
  name: 'AuthCore',
  components: {
    Login,
    Register,
    Profile
  },
  data: () => {
    return {
      currentPage: false,
      userprofile: false
    }
  },
  mounted: function() {
    this.checkLogin()
  },
  methods: {
    async logout() {
      this.userprofile = false;
      appwrite.account.deleteSession('current');
    },
    async login(username, password) {
      console.log({username, password})
      try {
			await appwrite.account.createSession(
				event.target.email.value, 
				event.target.password.value
      );
      this.checkLogin();
      return true;
		} catch(error) {
      console.error(error);
			return false;
		}
    },
    async register(username, password, email) {
      try {
      await appwrite.account.create(email, password, username);
      await appwrite.account.createSession(email, password);
      this.checkLogin();
      } catch(error) {
        console.error(error);
        return false;
      } 

    },
    async checkLogin() {
		try {
			const response = await appwrite.account.get();
      this.userprofile = response;
		} catch(err) {
			if (err == 'Error: Unauthorized') return;
			console.error(err);
		}
    }
  }
}
</script>

<style>
  html {
    background: linear-gradient(90deg, rgba(209,0,176,1) 0%, rgba(0,249,255,1) 100%);
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  input, button, select, textarea {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .loginPage input {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .loginCore {
    position: absolute;
    width: 300px;
    background-color: white;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
  }
  .loginCore span {
    color: rgb(0, 162, 255);
  }
  .loginCore span:hover {
    cursor: pointer;
  }
  .loginPage input {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .loggedIn {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .loggedIn h1 {
    margin: 0;
  }
  .loggedIn h2 {
    margin: 0;
  }
  .loggedIn p {
    margin: 10px;
  }
  .error {
    color: red;
  }

  .loginSwitchContainer {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .loginSwitchContainer p {
    margin: 0;
    margin-bottom: 5px;
  }
</style>
