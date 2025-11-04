<template>
  <div class="TaskCore">
    <h1>Appwrite TO-DO List</h1><div v-for="data in tasks" :key="data.$id || data.task">
      <Task :data="data" @refreshData="fetchTasks" />
    </div>
    <div class="newTaskForm">
      <input v-model="newTask" placeholder="Add New Task" />
      <button v-on:click.prevent="createNewTask"><span>+</span></button>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { appwrite } from './utils.js'

import Task from './components/Task.vue'
import { SECRETS } from './secrets.js'

const tasks = ref([])
const newTask = ref('')

const fetchTasks = async () => {
  try {
    const response = await appwrite.database.listDocuments( 
      SECRETS.DB.databaseId, 
      SECRETS.DB.tableName,
    )
    tasks.value = response.documents || []
  } catch (error) {
    console.log(error)
  }
}

const createNewTask = async () => {
  if (!newTask.value.trim()) return

  try {
    // Here we don't use a transaction for a single document creation, it could be useful mostly when multiple operations are needed (CF https://appwrite.io/docs/products/databases/transactions)
    await appwrite.database.createDocument(
      SECRETS.DB.databaseId,
      SECRETS.DB.tableName,
      'unique()',
      {
        task: newTask.value,
        done: false,
        date: new Date()
      },
    )
    newTask.value = ''
    await fetchTasks()
  } catch (error) {
    console.error('createNewTask error', error)
  }
}

onMounted(fetchTasks)
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