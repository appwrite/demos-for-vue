<template>
  <div class="FileCore">
    <h1>Appwrite File Upload</h1>
    <FileUploader v-on:refreshData="getAllFiles" />
    <h2>Uploaded Files:</h2>
    <div v-for="file in allFiles" :key="file.$id">
      <FileComponent v-bind:fileData="file" v-on:refreshData="getAllFiles" />
    </div>
  </div>
</template>

<script>
import { appwrite } from './utils'

import FileUploader from './components/FileUploader'
import FileComponent from './components/FileComponent'

export default {
 name: 'App',
 components: {
   FileUploader,
   FileComponent
 },
 data() {
   return {
     allFiles: []
   }
 },
 created() {
   this.getAllFiles()
 },
 methods: {
   getAllFiles: function() {
     let promise = appwrite.storage.listFiles();

      promise.then((response) => {
          console.log(response); // Success
          this.allFiles = response.files
      }, function (error) {
          console.log(error); // Failure
      });
   }
 }
}
</script>

<style>
  * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .FileCore {
    width: 500px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0px 0px 10px black;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    max-height: 80%;
    overflow-y: auto;
  }
</style>