

# Appwrite + VueJS =❤️
This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [VueJS](https://vuejs.org/) by creating a file uploading application where you can upload files and see recently uploaded files.

## Prerequisites

-   A recent version of [NodeJS](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/) (Feel free to use [NPM](https://www.npmjs.com/) if you want to, just switch out the Yarn Commands for their NPM counterparts)
-   [A locally running appwrite instance](https://appwrite.io/docs/installation).

## Getting Started
To get started as fast as possible we will use the Vue CLI, here we will use NPX to launch the Vue CLI without installing it globally.
``` shell
npx @vue/cli create --default example-fileupload
cd example-fileupload
```
That should create an app with VueJS 2, Babel and ESLint, while we are in the terminal we might as well install the Appwrite SDK for later using:
```shell
yarn add appwrite
```


With that done go ahead and launch the development server on `localhost:8080` using:
``` shell
yarn serve
```

## Housekeeping and The Appwrite SDK
First, we want to remove the default components contained within the boilerplate app we just created.

 1. Delete the `src/components/HelloWorld.vue` component
 2. Replace the code in `src/App.vue` to the following:
 ```html
 <template>
   <div></div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
 ```

This will give us a basic app with nothing in it, which allows us to start creating our file uploading app.

Next, we are going to create a JS File with the Appwrite Initialisation code so we can easily import it in our app code from where ever we like. Create a new file `src/utils.js` and place the following code in it.

```js
import * as Appwrite from  'appwrite'
const appwrite =  new Appwrite()
appwrite
  .setEndpoint('http://EndpointURL.example/') // Replace this with your endpoint
  .setProject('ProjectID') // Replace this with your projectID
 
let promise = sdk.account.createSession('emailaddress', 'password'); // Replace with a appwrite account you created

promise.then(function (response) {
      console.log(`Successfully logged in as: ${response.name}`); // Success
  }, function (error) {
      console.error(error); // Failure
  });
 
 
export { appwrite }
```
Make sure to replace the URL and ProjectID with your Endpoint and ProjectID You created in your appwrite installation.

## Creating the web app
The web app we are creating will be split into 3 main components (4 Including Utils.js) these components are:

 - `src/App.vue` This will be the main part of our app and will wrap everything together
 - `src/components/FileComponent.vue` This will handle displaying the files, downloading them and deleting them.
 - `src/components/FileUploader.vue` This is what handles file uploads

Let's get started then

## `src/App.vue`
App.vue will be how we wrap things up, but we need to start creating the basics before we work on the others, including the refresh files from server code and basic styling.

### The Template section

We'll start by creating the basic template of this Web App, in the `src/App.vue` file go ahead and replace the `<template>` section with the following.
```html
<template>
  <div class="FileCore">
    <h1>Appwrite File Upload</h1>
    <!-- File Uploader will go here -->
    <h2>Uploaded Files:</h2>
    <div v-for="file in allFiles" :key="file.$id">
      <!-- File Component will go here -->
    </div>
  </div>
</template>
```
Breaking down this template it's mainly HTML apart from the `v-for` section where we loop through the `allFiles` variable which we will create in the `data()` function later.

### The Script section
Next, we will create the data state, `created()` function (to run the refreshFiles on launch) and `getAllFiles()` method that will be used to get a list of the latest files on from the server.

First, we will add the Appwrite SDK we made earlier by placing the following at the very top, even before the export default:
```js
import { appwrite } from './utils'
```

Next, we will create the data() which will store the variables (state) which we will use in `App.vue`, we're only going to use one variable as the rest is handled by the other components. Go ahead and add the following within the `export default` object.

```js
data() {
    return {
        allFiles: []
    }
},
```
We'll also create the `getAllFiles()` method now, Create a new object in the `export default` object called `methods` and add the following code within it:
```js
getAllFiles: function() {
    let promise = appwrite.storage.listFiles(); // Get all files from server

    promise.then((response) => { // wait until we get a response
        console.log(response); // Success
        this.allFiles = response.files // if success then set the allFiles variable to the files returned from server
    }, function(error) {
        console.error(error); // If we fail then print the error to the console.
    });
} 
```
This function does the following:

 1. Requests all the files from the server
 2. When the request is processed from the server if it's successful then set the allFiles variable to the file list returned
 3. If we fail then log the error into the console for further inspection and debugging.

and finally, we will create a `created()` function, in VueJS the `created()` function is always executed when the component is created hence its name, we use this to trigger the initial get of data when the `App.vue` component is first created. Go ahead and add this code into the `export default` object And make sure it isn't in the `methods`object or else it will not execute.
```js
created() {
  this.getAllFiles() // Trigger initial get of file list.
}
```
With that, all the code for the `App.vue` component is done!

You should finish off with something like this:
```js
<script>
import { appwrite } from './utils'

export default {
 name: 'App',
 components: {
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
          console.error(error); // Failure
      });
   }
 }
}
</script>
```


### Styling
When it comes to styling this app, feel free to style it yourself and make it unique or use the style I created earlier. If you want to use mine simply replace the `<style>` section with the following code:

```html
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
```

and finally, the `App.vue` is complete (until we create the other two components and need to add them into here.)

Give yourself a pat on the back. 🥳🥳🥳

Next, we will start creating the fileUploader.

## `src/components/FileUploader.vue`
If you haven't already, go ahead and create the `src/components/FileUploader.vue` file, now before we start creating this component I'm going to start talking about how it's going to work.
Essentially all the FileUploader appears as to the user will be a button but behind the scenes, we're going to pull some trickery to make it easy to start file uploads.

What we are actually going to do is create a file upload input and hide it using `display: none` in its styling, then to trigger the file upload we will use a reference of the input uploader and tell it that the user has clicked it triggering the file upload prompt!

```
TIP: A reference is essentially the component itself but in a JS version, it allows us to perform various things on it such as changing it's style, triggering events and listening to events. We don't normally have to do much with this due to the fact that VueJS Handles the majority of that stuff for us.
```

We will then use an event listener we created to detect an `onChange()` event, since that is triggered when the user has completed the file upload, this will then run a function that will re-use the reference we created earlier to get the files and finally send them to the appwrite file upload function in the SDK!

I know that sounds like a lot but it's actually quite simple and I'll show you now.

### The templating section

We will first create the template of the component.
```html
<template>
    <div class="fileUploader">
        <input type="file" ref="fileUpload" v-on:change="uploadFile" />
        <button @click="$refs.fileUpload.click()" :disabled="uploading">{{this.uploading ? 'Uploading... ' : 'Upload File'}}</button>
    </div>
</template>
```
Yep. That's it.
All we're creating here is a file input (Which we will later hide using CSS) and a button. Going more in-depth though shows quite a lot going on here with the `<input>` and `<button>` components.

The input has 2 special properties on it, one is the `ref` attribute this is an attribute used to add the input's reference into VueJS's `this.$ref` object, we can use this later for more interesting things.

The `v-on:change` attribute is a VueJS Event Listener that triggers the `uploadFile` method we will create later when the File's are select on the user's end.


The button has 3 interesting things on it, one of them is the `@click` attribute, this is used to trigger the function on click and is shorthand for `v-on:click` which is an event listener for clicks. It triggers the `$ref.fileUpload.click` function which isn't a function we defined but a function of the reference of input we created earlier and allows us to trigger a file upload without the input even being visible.

The :disabled is a VueJS bind which will disable the button when the web app is busy uploading a file. This helps prevent rate-limiting and accidentally uploading a file multiple time since the user can't tell if it worked.

and finally the `{{this.uploading ? 'Uploading... ' : 'Upload File'}}` will simply switch the text when the input is uploading the file also helping the user know that it's currently uploading their file.

Phew, that was a lot, but we're not finished yet, we need to create the scripting of the uploading. Thankfully it's actually quite simple thanks to the reference we created.

### The Scripting Section
The `<script>` section for this component is only 30 lines long and is quite simple to explain, go ahead and create your `<script>` section for this component like so:
```html
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
	    if (this.uploading) { return }
            if (this.$refs.fileUpload.files[0]) {
                let promise = appwrite.storage.createFile(this.$refs.fileUpload.files[0], ['*'], ['*']);

                this.uploading = true

                promise.then((response) => {
                    console.log(response); // Success
                    this.uploading = false
                    this.$emit("refreshData")
                }, function (error) {
                    console.error(error); // Failure
                    this.uploading = false
                });
            }
        }
    }
}
</script>
```
Right, So the data() state has only one variable. The uploading variable. This is triggered true when the uploader is uploading and is triggered false when it's finished. It's used to signal to the user and the app that a file is currently being uploaded and a new one shouldn't be uploaded until it's finished.

We then have the `uploadFile()` method, this will:

 1. Check if a file is currently uploading, if so then don't start a new upload.
 2. Check if a file is even there to be uploaded
 3. Starts uploading the file and saves the promise created into a variable*
 4. Sets this.uploading to true to show the user the upload has started and to prevent a new one
 5. When the upload is finished the uploading variable is set to false and the `App.vue` is requested to refresh the current file list using an event (This will be acted upon later when we bring it all together at the last step.)
 6. If we fail then throw the error to the console and set uploading to false.


`* We also set the permissions on the file so anyone can read and write it, This should not be done in a production environment and is only done for the purposes of simplifying and tutorial purposes!`

So, that's the script section finished! The last section is to style it, feel free to do this yourself if you want but if you just want to continue I've posted my style below, Simply create or replace your current `<style>` section in the component with the one I've created.

```html
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
```
After this we will create the `src/component/FileComponent.vue` component, this is what will be looped to display the files and will show the user the name, MIME Type and allow them to download and delete the file.

Let's move on!

## `src/components/FileComponent.vue`
If you haven't already, go ahead and create this Component. For this component, we will use a prop passed from the parent which will be created from the `v-for` loop in `src/App.vue` So as usual, we will start with the `<template>` section of this component

### The Template Section
The template section for this is quite simple and only really either displays props or has buttons to run functions. Go ahead and copy the code below into your component
```html
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
```

So, let's break this all down.
The ``{{}}`` sections are all used in this to display prop values, such as the name and mimeType. These values are both populated by appwrite when it returns the data back to `src/App.vue`. 

The `@click` as used before is an event listener for the `onClick` event and will run the `downloadFile` or `deleteFile` depending on what button you click.

With the templating done, we can go ahead and move onto the scripting of this component.
### The Scripting Section
The scripting component will be a usual one apart from this time having a `props` array in it. This array tells VueJS what to props this component expects to receive from the parent component. Go ahead and create a `<script>` section and use the following code:
```html
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
```

First of all, we import the SDK we created earlier like we usually do, then we create the `props` array like we stated we would passing `'fileData'` as the only prop we are expecting.  The two methods will be explained below:

#### `downloadFile()`
`getFileDownload()` is a really simple function, it isn't even asynchronous which means we don't need to use `.then()` with it. All this function does it request the current download link from the appwrite server by using the ID it received from the `fileData` prop the parent sends. It will then create a new tab using that URL and finally focus us onto that window so the download can start.

#### `deleteFile()`
The `deleteFile()` will go ahead and do the following:

 1. Request the appwrite server to delete the file using the ID received from the fileData prop
 2. Once the server has finished dealing with the request if successful then we will request `src/App.vue` to refresh the file list to show the newly deleted file
 3. if we fail we will throw the error from appwrite into the console.

That's the scripting section of this component finished and thankfully that's the rest of the scripting we will have to do for the rest of this project!

As always if you want to style this component yourself you are welcome to, however if you want to use my style it is below:

```html
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
```

## Stitching it all together!
Finally, we can bring it all together to create a File Upload app using Appwrite. Go ahead and open up `src/App.vue` and below:
```js
import { appwrite ] from './utils`'
```
go ahead and add the following to import the components we have just created:
```js
import FileUploader from './components/FileUploader'
import FileComponent from './components/FileComponent'
```
Once we have done that we need to tell VueJS that we want to use these components in the template. In the `components` object in `export default` go ahead and add the two components so it looks like this:
```js
components: {
    FileUploader,
    FileComponent
},
```

With this done we can modify the template we created in `src/App.vue` earlier and replace the placeholders we created earlier with the actual components. 

Go ahead and replace:

```html
<!-- File Uploader will go here -->
```
with
```html
<FileUploader v-on:refreshData="getAllFiles" />
```
and

```html
<!-- File Component will go here -->
```
with
```html
<FileComponent v-bind:fileData="file" v-on:refreshData="getAllFiles" />
```

Notice the `v-on:refreshData` this is what the `this.$emit("refreshData")` triggers and as you can see we currently have it set to request the current file list from the server again. We also pass the `fileData` prop using `v-bind` so the FileComponent has it's file data.

## Congratulations! 🥳🥳🥳
Give yourself a pat on the back, since you just successfully created a file upload web app using Appwrite and VueJS! You should now have enough knowledge in order to use the Storage API with Appwrite and VueJS and if you have any more questions do not hesitate to contact us on [Discord](https://discord.gg/ZFwqr3S) and if you notice any errors with this tutorial then feel free to raise an Issue or PR in the [GitHub of this tutorial](https://github.com/appwrite/demos-for-vue/)

Thank you for following the tutorial from all of us at the Appwrite Team.
