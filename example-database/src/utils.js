import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
  .setEndpoint('ENDPOINT URL') // Replace this with your endpoint
  .setProject('PROJECTID') // Replace this with your projectID

  let promise = sdk.account.createSession('emailaddress', 'password');

  promise.then(function (response) {
      console.log(`Successfully logged in as: ${response.name}`); // Success
  }, function (error) {
      console.error(error); // Failure
  });

export { appwrite }
