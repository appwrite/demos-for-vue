import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
  .setEndpoint('https://9680b3e.online-server.cloud/v1') // Replace this with your endpoint
  .setProject('5f567e45491bb') // Replace this with your projectID

export { appwrite }
