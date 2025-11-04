import { Client, Account, Databases } from 'appwrite'
import { SECRETS } from './secrets.js'

// Configure client (using env vars)
console.log("SECRETS.DB = ",SECRETS.DB)
const client = new Client()
  .setEndpoint(SECRETS.DB.endpoint)
  .setProject(SECRETS.DB.projectId)

const account = new Account(client)
const databases = new Databases(client)


// Exporter a named object to provide appwrite features
const appwrite = {
  client,
  account,
  database: databases,
}

export { appwrite }