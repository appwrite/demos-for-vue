// Get the secrets credentials from .env file to a structured object
export const SECRETS = {
  DB:{
    endpoint : import.meta.env.VITE_DB_ENDPOINT,
    projectId : import.meta.env.VITE_DB_PROJECTID,
    databaseId : import.meta.env.VITE_DB_DATABASEID,
    tableName : import.meta.env.VITE_DB_TABLENAME,
  } 
}