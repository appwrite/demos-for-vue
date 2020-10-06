<template>
    <div class="fileUploader">
        <input type="file" ref="fileUpload" v-on:change="uploadFile" />
        <button @click="$refs.fileUpload.click()" :disabled="uploading">{{this.uploading ? 'Uploading... ' : 'Upload File'}}</button>
    </div>
</template>

<script>
import { appwrite } from '../utils'

export default {
    data() {
        return {
            uploading: false
        }
    },
    methods: {
        uploadFile() {
            if (this.$refs.fileUpload.files[0]) {
                let promise = appwrite.storage.createFile(this.$refs.fileUpload.files[0], ['*'], ['*']);

                this.uploading = true

                promise.then((response) => {
                    console.log(response); // Success
                    this.uploading = false
                    this.$emit("refreshData")
                }, function (error) {
                    console.log(error); // Failure
                    this.uploading = false
                });
            }
        }
    }
}
</script>

<style>
    .fileUploader input {
        display: none
    }

    .fileUploader button {
        width: 200px;
        height: 40px;
        background: #c52653;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 25px;
        transition: 0.5s;
    }

    .fileUploader button:disabled {
        background: #bb657d;
    }

    .fileUploader button:hover:not([disabled]) {
        scale: 1.05;
        cursor: pointer;
        box-shadow: 0px 0px 10px black;
    }
</style>