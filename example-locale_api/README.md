# Appwrite + VueJS =❤️

This example is to showcase [Appwrite's Locale API](https://appwrite.io/docs/client/locale) with [Vue](https://vuejs.org/) by creating a simple web-app that displays your IP, Country, Continent, CountryCode, Continent and Currency.

## Getting Started

We'll be using the Vue CLI, to create a boilerplate and quickly get started with our project.

### Installation

```shell
npm i -g @vue/cli
vue create appwrite-locale-vue
cd appwrite-locale-vue
```

While we are in the CLI, we will also install the Appwrite Web SDK by running:

```shell
npm install appwrite
```

And finally we will launch the Vue development server with:

```shell
npm run serve -- --port [port_number_of_api_endpoint]
```

## Introducing the Appwrite SDK

To initialize the Appwrite's SDK, create a `utils.js` file in the `src` folder and paste the following code. Here, inside the `setEndpoint` and `setProject` parantheses, add your API endpoint and project ID from Appwrite's dashboard.

```js
import * as Appwrite from "appwrite";

let sdk = new Appwrite();

sdk
  .setEndpoint("[API ENDPOINT]") // Your API Endpoint
  .setProject("[Your Project ID]"); // Your project ID

export {sdk};
```

A deeper inspection of this code can be found in the comments within it,

TL:DR: Create a Appwrite SDK Instance and initalise it with the endpoint and ProjectID of the project we are working with. Then export this for usage outside of the file.

## Creating App.vue

Inside our `src/App.vue` we'll be importing from our `utils.js`.
Paste the following code inside our `src/App.vue` file.

```js
<template id="app">
  <div>
    <h1 class="header">app<strong>write</strong> Locale API example</h1>
    <div class="info">
      <h1>Here are you Location Details!</h1>
      <p>
        <strong>Your IP Address</strong>
        : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ info.ip }}
      </p>
      <p>
        <strong>Your Country</strong>
        : &nbsp;&nbsp;&nbsp;{{ info.country }}
      </p>
      <p>
        <strong>Your Country Code</strong>
        : &nbsp;&nbsp;&nbsp;{{ info.countryCode }}
      </p>
      <p>
        <strong>Your Continent</strong>
        : &nbsp;&nbsp;&nbsp;{{ info.continent }}
      </p>
      <p>
        <strong>Your Currency</strong>
        : &nbsp;&nbsp;&nbsp;{{ info.currency }}
      </p>
    </div>
  </div>
</template>

<script>
import { sdk } from "./utils";
export default {
  name: "App",
  data() {
    return {
      info: {},
    };
  },
  method: {
    fetchApiData() {
      let promise = sdk.locale.get();
      promise.then(
        function () {
          this.setResults; // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    },
    setResults(results) {
      this.info = results;
    },
  },
};
</script>

<style>
body {
  background-color: #171d37;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header {
  text-align: center;
  font-family: "Poppins", sans-serif;
  color: #f35884;
  margin-left: 10%;
}
.info {
  text-align: center;
  margin-left: 35%;
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #f35884;
  font-family: "Poppins", sans-serif;
}
.info h1 {
  padding-top: 50px;
}
</style>
```

## Explanation of above code:

We first initialized the SDK in our `utils.js` file and then imported the locale.get() method into our `App.vue` file.
Then by using a promise, we fetched the data from our API and displayed it in our DOM.

Congratulations!!! We just used the Locale API to get the clients IP and other details!! Woo-hoo! 🥳🥳🥳
Now you can use these details that you've just got from the Appwrite's Locale API in your own project and personalize every user's experience.

Good luck! If you need any help, feel free to join the [Discord](https://appwrite.io/discord) or refer to the [Appwrite Documentation](https://appwrite.io/docs).
