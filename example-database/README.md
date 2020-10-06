# Appwrite + VueJS =❤️
This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [VueJS](https://vuejs.org/) by creating a simple tasks web application where you can add, remove and mark tasks as done.

## Prerequisites

-   A recent version of [NodeJS](https://nodejs.org/)
-   [Yarn](https://yarnpkg.com/) (Feel free to use [NPM](https://www.npmjs.com/) if you want to, just switch out the Yarn Commands for their NPM counterparts)
-   [A locally running Appwrite instance](https://appwrite.io/docs/installation).

## Getting Started
To get started as fast as possible we will use the Vue CLI, Here we will use NPX to launch the Vue CLI without installing it globally.
``` shell
npx @vue/cli create --default example-database
```
that should create an app with VueJS 2, Babel and ESLint, while we are in the terminal we might as well install the appwrite SDK for later using:
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

This will give us a basic app with nothing in it, which allows us to start creating our tasks app.

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
Aswell as the email address and password to sign in the app to a appwrite account so it can access the functions it needs.

## Creating the collection
In order for us to create this to-do app we need a place to store it, In appwrite we have collections and if you use or have used MongoDB this should be instantly familiar! We need to first create a collection in our appwrite database for this app to use.

First, we want to navigate to our appwrite control panel and login, then navigate to the Database tab.
![Image Showing where the database tab is](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/1.png)
Once there go ahead and click on the `+` icon in the bottom right corner, Go ahead and give this new collection a name, any name it doesn't matter since what we need is the CollectionID which you will get once you've created the collection. It can be found here: 
![Image Showing where the collection ID is](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/2.png)
Go ahead and copy that and keep it in an open notepad since we will use it later when we are writing code

Next, we are going to create the schema for the collection. Go ahead and navigate to settings under the rules section click on `Add` where you want to add 3 rules, Copy the rules from the images below:

![Image Showing collection rules 1](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/3.png)

![Image Showing collection rules 2](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/4.png)

![Image Showing collection rules 3](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/5.png)

Finally, we are going to allow read, write access to everyone this is because we don't want to have to sign in to add these tasks and read them. Please note that you do not want to do this in a public web app powered by appwrite. We are only doing this for ease of use while developing this project.

Navigate to the settings again and in the permissions section add * to both read and write permissions like so
![Image Showing permissions](https://raw.githubusercontent.com/PineappleIOnic/demos-for-vue-1/example-database/example-database/tutorial-resources/images/6.png)

Make sure to click Update to apply all the changes you've just made to the collection, once we've done that we can get back stuck into the code!
## Creating the fetch code
We want to be able to fetch all the tasks when the app loads up and when changes are made, so in app.js we are going to create a function that can do so, First, we are going to import the appwrite SDK we created earlier!

In the `<script>` section of `src/App.vue` we are going to add:
```js
import { appwrite } from './utils
```
At the very top, even before the `export default` this will allow us to access our appwrite instance easily.

Next we are going to create a methods object in the `export default` aswell as a function to fetch the tasks:
```js
methods: {
    fetchTasks: function() {
        let promise = appwrite.database.listDocuments('CollectionID');
        promise.then((response) => {
            console.log(response); // Success
            this.tasks = response.documents
        }, function(error) {
            console.log(error); // Failure
        });
    }
}
```
Make sure to replace `CollectionID` with the CollectionID of the collection you made earlier!

So, as we can see we have added a fetchTasks function. Breaking this down will leave us with the following steps we take:

 1. Request the listDocuments API Endpoint from appwrite and place the promise into its own variable
 2. When the variable is finished, if successful then we will add it into the tasks data state we will create later.
 3. If it fails then we simply log an error in the console

While we are working on this, we will quickly add a `tasks` object in data, create a data() function in `export default` with data like so (We'll also add a newTask object for later.):
```js
data: function() {
  return {
    tasks: [],
    newTask: ''
  }
},
```
and finally, we will add a create() function into `export default` so we can run the `fetchTasks()` function when the `App` component gets created.
```js
created: function() {
  this.fetchTasks()
},
```

So, with all this added your `<script>` section should currently look like:
```js
<script>
import { appwrite } from './utils'

export default {
 name: 'App',
 components: {
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
```
With that done, we'll move onto creating the Template!

## Writing the App Template
We'll take a break from the code to indulge ourselves in some nice HTML (VueJS Syntax) in the `<template>` section we will write the following:
```html
<template>
  <div class="TaskCore">
    <h1>Appwrite TO-DO List</h1>
    <div v-for="data in tasks" :key="data.task">
	<!-- we will place the task component here -->
    </div>
    <div class="newTaskForm">
      <input v-model="newTask" placeholder="Add New Task">
      <button v-on:click.prevent="createNewTask"><span>+</span></button>
    </div>
  </div>
</template>
```

All of this is more or less normal HTML, Apart from a few exceptions!
First, we use `v-for` on the div on line 4, this is a special vueJS Addition which allows us to create a component for every instance in an array and using this we create a new div for every task we receive from appwrite and we get a nice `data` object within the div which we will use later.

We also create a div with an input and a button! We will use this later to add new tasks to the collection, you should notice we use v-model on the input, we do this so any text in the input will automatically pollute the newTask variable in data() we created earlier, this makes it really easy for us later to process the input and change it to nothing since it's a two-way bind!

You can either opt to style this yourself or use the style I created myself and replace your `<style>` section with this:

```html
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
```

## Create the addNewTask() Function
Eariler we created a input and button to run the addNewTask() function, this will add a new task to our database and refresh the current state from the server once it's done. In the `methods` object we created earlier add this following code:
```js
createNewTask: function() {
    if (this.newTask === '') {
        return
    }

    let promise = appwrite.database.createDocument('CollectionID', {
        task: this.newTask,
        done: false,
        date: new Date()
    }, ['*'], ['*']);

    promise.then(() => {
        this.fetchTasks()
        this.newTask = ''
    }, function(error) {
        console.log(error); // Failure
    });
},
```
Make sure to replace CollectionID with the ID from the Collection you made earlier!
What this function does is the following:

 1. If newTask is empty then don't add a new document (No need for empty tasks!)
 2. Next we run the createDocument function with the collection ID and an Object which contains the new task we want to add if it's done and the current Date (This isn't used but can be used later to add a timestamp on tasks!). The `[*]`'s are us setting the read-write permission on this new document to everyone. Read more about the API by clicking [here](https://appwrite.io/docs/client/database#createDocument).
 3. If successful then refresh the data from the server and set newTask to nothing to indicate the object was added.
 4. If there is an error then console log it for checking.

With this, the add new tasks function is completed!

## Creating our custom tasks component
Now, we have a way to add tasks but we have no way to display them! For this, we are going to create a `Task` component in Vue so we can easily create multiple instances.

To get started we are going to create a new file in `src/components/Task.vue` this is where we will store our Task component.

### The template side
We are going to create the template now, and it's no where near as much as the main `App.vue` we made earlier, we are simply going to add a `<template>` section like so:
```html
<template>
    <div class="taskComponent" v-on:click.self="doneTask">
        <div v-on:click.self="doneTask" v-bind:class="!this.data.done ? 'taskName' : 'taskName taskDone'">{{data.task}}</div>
        <div class="taskDelete" v-on:click="deleteTask"><span /></div>
    </div>
</template>
```
Let's explain this template a bit, first, we have a div with the class of "taskComponent" we will use this to style it later. Next, we have a `v-on:click.self` this is another one of them special VueJS things, this like the button earlier will run a function when it's clicked But what's this `.self` on the end? This `.self` is used to prevent Bubbling which is where if children are clicked then the function is still run, this isn't useful since there is a second button within this div which we want to do something completely different, without the `.self` the other button will run the same function as it's parent.

We also add the exact same `v-on:click.self` to the text, this is since we want the same function to run if the text is clicked. The `v-bind:class` is special as it's a normal class attribute but on render Javascript is executed to determine what class should be used. If the task is marked as done then `taskDone` is added to the class as well as `taskName` which is there regardless of if it's done or not. The `taskDone` class later will strikethrough the task if it's done and give it a slightly different colour.

The `{{data.task}}` is how we use a variable within the VueJS HTML Templating engine, it will display the task in that div.

A third `v-on:click` is used later but this one will delete the task when it's clicked, and since it doesn't have any children that have different functions we don't add `.self` to this one.


Now, you may be asking. Where is this `data` object coming from? Well it isn't there at the moment, but we will be adding to our `export default` of this component a prop with the `data` object name, this is how `App.vue` will pass the task object to the task component and allow it to be used within it's context.

### The Scripting Part
The code for this isn't that much complicated than the core `App.vue` as it uses mainly the same ideas.
We want to create a `<script>` section below our `<template>` section and add the appwrite SDK we made earlier aswell as create a export default for the component to use.
```js
<script>
import { appwrite } from './../utils` // We use a ../ because we are within a folder (the component one.)

export default {
  props: ['data'], // The data prop which we used in the template and will use in our methods is defined here.
 
  // We will also create a method object for what comes next.
  methods: {
  }
}
</script>
```
With that, the basic skeleton of our `<script>` section is done! Now we need to add two methods.
#### deleteTask() Function
This will delete the task, in this function we use both `$collection` and `$id` which are apart of your data you requested from appwrite, now notice how you didn't add this data nor define it earlier in the rules. This is actually apart of data appwrite automatically adds to your documents and any other data you request from a database so you can more easily identify and work with it.

The code we will add is:
```js
deleteTask: function() {
    let promise = appwrite.database.deleteDocument(this.data.$collection, this.data.$id);

    promise.then(() => {
        this.$emit('refreshData')
    }, function(error) {
        console.error(error);
    });
},
```

This function is pretty simple, it will:

 1. Request the document to be deleted by passing the collectionID and the ID of the document itself, more documentation of this API Call can be found [here](https://appwrite.io/docs/client/database#deleteDocument). (the promise is also stored in a variable)
 2. If successful then it emits a `refreshData` event, this will be implemented later in `App.vue` and will request that `App.vue` refreshes the data from the server.
 3. If it fails then it calls console.error with the error to log it to console.

Next, we have the:
#### doneTask() Function
This will toggle the task being done or not in the database this will also utilise the updateDocument() API in Appwrite which more info can be found [here](https://appwrite.io/docs/client/database?sdk=web#updateDocument).


```js
doneTask: function() {
    let promise = appwrite.database.updateDocument(this.data.$collection, this.data.$id, {
        done: !this.data.done
    }, ['*'], ['*']);

    this.data.done = !this.data.done

    promise.then(() => {
        this.$emit('refreshData')
    }, function(error) {
        console.error(error);
    });
}
```
This function is pretty simple. When you break it down it will:

 1. Request document to be updated with new info, we don't have to send all its info. Only the info we want to change we also send the collectionID and id of the document so appwrite knows what to change. The `[*]` is once again used to set permissions, but since we want them to stay set to everyone we will just pass `[*]` to both read and write. Notice how we use an Object only containing the `done` object and we simply toggle this to the opposite of the data we currently have using `!`
 2. Once again requests `App.vue` to refresh the current data once done by emitting a `refreshData` event.
 3. If fails we will send an error to console with the `console.error` function.

and with that all the coding is done for this to-do app, all we need to do now is wrap it all up.

Go ahead and style the Task component yourself if you like or use my own styling:
```html
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
```

## Wrapping it all up.
To wrap it all up we need to add the Task component into App.vue. Doing this is simple
Go back into `src/App.vue` and add the following below the import appwrite statement:

```js
import Task from './components/Task'
```
This will import the Task component, but we still need to tell Vue that we are using this component, In the `components` object in your `export default` go ahead and add `Task` like so:
```js
components: {
  Task
},
```

In the `App.vue` template go ahead and replace
```html
<!-- we will place the task component here -->
```
with
```html
<Task v-bind:data="data" v-on:refreshData='fetchTasks' />
```
This will now create a new Task component for every Task and pass the taskData using v-bind on the data attribute, we also listen for the `refreshData` event we kept using earlier using `v-on` and if it's received we will run the `fetchTasks` function to refresh the tasks.

With this your to-do app should now be done!

## Congratulations! 🥳🥳🥳
You have just completed the example todo app with appwrite and VueJS! You should now have enough knowledge in order to use Databases with Appwrite and VueJS and if you have any more questions do not hesitate to contact us on [Discord](https://discord.gg/ZFwqr3S) and if you notice any errors with this tutorial then feel free to raise an Issue or PR in the [GitHub of this tutorial](https://github.com/appwrite/demos-for-vue/)

Thank you for following the tutorial from all of us at the Appwrite Team.
