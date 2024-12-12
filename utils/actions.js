'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import sql from 'mssql';
import { getServerSession } from "next-auth/next";
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  process.env.AZURE_AD_TENANT_ID,
  process.env.AZURE_AD_CLIENT_ID,
  process.env.AZURE_AD_CLIENT_SECRET
);

const config = {
  server: 'contact-app-server.database.windows.net',
  database: 'contactDB',
  options: {
    encrypt: true
  },
  authentication: {
    type: 'azure-active-directory-access-token',
    options: {
      token: await credential.getToken('https://database.windows.net/.default').then(token => token.token)
    }
  }
};

export async function connectDB() {
  try {
    const poolConnection = await sql.connect(config)
    return poolConnection
  } catch (error) {
    console.error(error)
    return
  }
}

export async function getContacts() {

  const session = await getServerSession(authOptions)

  try {
    const dbConnect = await connectDB()
    const queryTable = await dbConnect.request().query(`SELECT * FROM [contacts] INNER JOIN [customers] ON [contacts].[customer_id] = [customers].[id]`)
    return { data: queryTable.recordset }
  } catch (error) {
    console.error(error)
    return { error: 'Valami hiba történt...' }
  }

}