import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
  .setEndpoint('ENDPOINT URL') // Replace this with your endpoint
  .setProject('PROJECTID') // Replace this with your projectID

export { appwrite }
