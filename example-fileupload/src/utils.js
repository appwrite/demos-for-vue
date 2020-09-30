import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
  .setEndpoint('ENDPOINTURL') // Replace with your own endpoint
  .setProject('PROJECTURL') // Replace with your own ProjectID

export { appwrite }
