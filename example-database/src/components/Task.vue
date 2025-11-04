<template>
  <div class="taskComponent" @click.self="doneTask"><!-- Update a task -->
        <div @click.self="doneTask" :class="['taskName', done ? 'taskDone' : '']">{{ props.data.task }}</div>
        <div class="taskDelete" @click.stop="deleteTask"><span></span></div><!-- Delete a task -->
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { appwrite } from '../utils.js'
import { SECRETS } from '../secrets.js'

const props = defineProps({
    data: { type: Object, required: true } // Prop to receive task data from parent
})
const emit = defineEmits(['refreshData']) // Emit event to parent to refresh data

// Reactive copy for "done" state (optimistic UI)
const done = ref(!!props.data.done)

// Keep local stat synchronized with props, when parent is updated
watch(() => props.data.done, (v) => {
    done.value = !!v
})

const deleteTask = async () => {
    try {
        await appwrite.database.deleteDocument(
            SECRETS.DB.databaseId,
            SECRETS.DB.tableName,
            props.data.$id,
        )
        emit('refreshData')
    } catch (error) {
        console.error(error)
    }
}

const doneTask = async () => {
    const newDone = !done.value
    // Update of optimistic UI
    done.value = newDone
    try {
        await appwrite.database.updateDocument(
            SECRETS.DB.databaseId,
            SECRETS.DB.tableName,
            props.data.$id,
            { done: newDone },
        )
        emit('refreshData')
    } 
    catch (error) {
      console.error(error)
      // Reverse on error
      done.value = !newDone
    }
}
</script>

<style>
    .taskComponent {
        margin: 0 auto;
        margin-top: 15px;
        margin-bottom: 15px;
        position: relative;
    }

    .taskName {
        width: calc(100% - 40px);
        width: 70%;
        box-shadow: 0px 0px 10px black;
        height: 50px;
        border-radius: 10px;
        margin: 0 auto;
        line-height: 50px;
        font-size: 25px;
        transition: 0.2s;
    }

    .taskComponent:hover .taskName {
        text-decoration: line-through;
        cursor: pointer;
        color: #535353;
    }

    .taskDone {
        text-decoration: line-through;
        color: #535353;
    }

    .taskDelete {
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: #f85353;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
        transition: 0.5s;
        color: white;
    }

    .taskDelete > span {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 5px;
        background-color: white;
        width: 20px;
        transform: translateX(-50%) translateY(-50%);
    }

    .taskDelete:hover {
        box-shadow: 0px 0px 10px black;
        scale: 1.05;
        cursor: pointer;
    }
</style>