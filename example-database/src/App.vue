<template>
  <div class="TaskCore">
    <h1>Appwrite TO-DO List</h1>
    <div v-for="data in tasks" :key="data.task">
      <Task v-bind:data="data" v-on:refreshData='fetchTasks' />
    </div>
    <div class="newTaskForm">
      <input v-model="newTask" placeholder="Add New Task">
      <button v-on:click.prevent="createNewTask"><span>+</span></button>
    </div>
  </div>
</template>

<script>
import { appwrite } from './utils'

import Task from './components/Task'

export default {
 name: 'App',
 components: {
   Task
 },
 data: function() {
   return {
    tasks: [],
    newTask: ''
   }
 },
 created: function() {
   this.fetchTasks()
 },
 methods: {
   createNewTask: function() {
     if (this.newTask === '') { return }

     let promise = appwrite.database.createDocument('CollectionID', {
       task: this.newTask,
       done: false,
       date: new Date()
     }, ['*'], ['*']);

      promise.then(() => {
          this.fetchTasks()
          this.newTask = ''
      }, function (error) {
          console.log(error); // Failure
      });
   },
   fetchTasks: function() {
    let promise = appwrite.database.listDocuments('CollectionID');

    promise.then((response) => {
        console.log(response); // Success
        this.tasks = response.documents
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

  .TaskCore {
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

  .newTaskForm input {
    width: calc(100% - 40px);
    width: 60%;
    box-shadow: 0px 0px 10px black;
    height: 40px;
    border-radius: 10px;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: 25px;
    margin-top: 30px;
  }

  .newTaskForm button {
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    border: none;
    height: 50px;
    width: 50px;
    background-color: #53f85b;
    border-radius: 10px;
    transition: 0.5s;
  }

  .newTaskForm button span {
    color: white;
    font-size: 50px;
    line-height: 30px;
  }

  .newTaskForm button:hover {
    box-shadow: 0px 0px 10px black;
    scale: 1.05;
    cursor: pointer;
  }
</style>