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
