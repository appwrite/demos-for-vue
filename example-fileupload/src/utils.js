import * as Appwrite from 'appwrite'

const appwrite = new Appwrite()
appwrite
  .setEndpoint('ENDPOINTURL') // Replace with your own endpoint
  .setProject('PROJECTURL') // Replace with your own ProjectID

  let promise = sdk.account.createSession('emailaddress', 'password');

  promise.then(function (response) {
      console.log(`Successfully logged in as: ${response.name}`); // Success
  }, function (error) {
      console.error(error); // Failure
  });

export { appwrite }
