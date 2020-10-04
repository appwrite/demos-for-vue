import * as Appwrite from "appwrite";

let sdk = new Appwrite();

sdk
  .setEndpoint("http://localhost:443/v1") // Your API Endpoint
  .setProject("5f7725e84c447"); // Your project ID

export {sdk};
