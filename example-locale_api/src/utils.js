import * as Appwrite from "appwrite";

let sdk = new Appwrite();

sdk
  .setEndpoint("[YOUR API ENDPOINT]") // Your API Endpoint
  .setProject("[YOUR PROJECT ID]"); // Your project ID

export {sdk};
