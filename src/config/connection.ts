import { MongoClient, Db } from "../../node_modules/mongodb/mongodb";
import 'dotenv/config'
const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri ?? '');

let dbPromise: Promise<Db>;

client.connect()
  .then(() => {
    dbPromise = Promise.resolve(client.db("factory_tycoon"));
    console.log("Conectado ao banco de dados!");
  })
  .catch((err) => {
    console.log("Erro na conexão com o banco de dados: ", err);
  });

export default async function getDb(): Promise<Db> {
  return dbPromise;
}
