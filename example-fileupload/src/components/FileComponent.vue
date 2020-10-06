<template>
    <div class="fileComponent">
        <div class="fileInfo">
            <h2>{{fileData.name}}</h2>
            <p>{{fileData.mimeType}}</p>
        </div>

        <button @click="downloadFile">Download</button>
        <button @click="deleteFile" class="deleteButton">Delete</button>
    </div>
</template>

<script>
import { appwrite } from '../utils'

export default {
    props: ['fileData'],
    methods: {
        downloadFile: function() {
            let result = appwrite.storage.getFileDownload(this.fileData.$id);
            var download = window.open(result, '_blank')
            download.focus()
        },
        deleteFile: function() {
            let promise = appwrite.storage.deleteFile(this.fileData.$id);

            promise.then(() => {
                this.$emit("refreshData")
            }, function (error) {
                console.error(error)
            });
        }
    }
}
</script>

<style>
    .fileComponent {
        width: 90%;
        height: 65px;
        box-shadow: 0px 0px 10px black;
        margin: 0 auto;
        border-radius: 10px;
        position: relative;
    }
    
    .fileInfo {
        position: relative;
        height: 100%;
        width: 200px;
        float: left;
    }

    .fileInfo h2 {
        position: absolute;
        left: 10px;
        top: 5px;
        margin: 0px;
    }

    .fileInfo p {
        position: absolute;
        left: 10px;
        top: 35px;
        margin: 0px;
    }

    .fileComponent button {
        float: right;
        width: 100px;
        height: 40px;
        background: #c52653;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 17px;
        transition: 0.5s;
        margin-top: 12px;
        margin-right: 10px;
    }

    .fileComponent button:hover:not([disabled]) {
        scale: 1.05;
        cursor: pointer;
        box-shadow: 0px 0px 10px black;
    }

    .deleteButton {
        background-color: #ff3333 !important;
    }
</style>