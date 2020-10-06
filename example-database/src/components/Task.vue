<template>
    <div class="taskComponent" v-on:click.self="doneTask">
        <div v-on:click.self="doneTask" v-bind:class="!this.data.done ? 'taskName' : 'taskName taskDone'">{{data.task}}</div>
        <div class="taskDelete" v-on:click="deleteTask"><span /></div>
    </div>
</template>

<script>
import { appwrite } from './../utils'
export default {
    props: ['data'],
    methods: {
        deleteTask: function() {
            let promise = appwrite.database.deleteDocument(this.data.$collection, this.data.$id);

            promise.then(() => {
                this.$emit('refreshData')
            }, function (error) {
                console.error(error);
            });
        },
        doneTask: function() {
            let promise = appwrite.database.updateDocument(this.data.$collection, this.data.$id, {
                done: !this.data.done
            }, ['*'], ['*']);

            this.data.done = !this.data.done

            promise.then(() => {
                this.$emit('refreshData')
            }, function (error) {
                console.error(error);
            });
        }
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