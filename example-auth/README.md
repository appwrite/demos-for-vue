# This will be a tutorial for creating a basic login page for Appwrite with Vue.
## But it currently isn't finished yet 😔 but the project is! Go ahead and check out the code and make sure to check back for when the tutorial is finished!

# Table of Contents
  * [Files](#files)
  * [Build Setup](#build-setup)

## Files
### Here we explain a little about the main files of this project
* #### [public/index.html](public/index.html)
The index.html in the public folder is a template that will be processed with [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin). See more at [Vue CLI Guide](https://cli.vuejs.org/guide/html-and-static-assets.html#html) about HTML in Vue.
* #### [src/App.vue](src/App.vue)
This is the main view file to Vue projects. Files with '.vue' types are structured in three parts: template, script and style.
* #### [src/main.js](src/main.js)
The src/main.js is the one that runs and renders the struture to '.vue' files.
* #### [src/utils.js](src/utils.js)
This is the file Appwrite created to give this project access to some important functions for authenticating.
* #### [src/components/login.vue](src/components/login.vue)
View used to process to login the user.
* #### [src/components/register.vue](src/components/register.vue)
View used to process to first access and registration of the user.
* #### [src/components/profile.vue](src/components/profile.vue)
Page after login, where you can verify that the login happened and see your information.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```
