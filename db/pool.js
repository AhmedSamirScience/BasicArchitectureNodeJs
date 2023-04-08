/**
 * el pool file da 3lshan a load el configurations bt3ti bta3t el database zai maslan el connection url (da khoud balak bgebo mn .env file)
 * 
 * 
 */
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
 
/**
 * da el link ely hyfhmk el donia kolha 
 *  https://node-postgres.com/
 */
const db_config = {
    connectionString: process.env.database_url, //khoud balak howa leh format el config da w fe attributtes tania kter bas da ely ana m7tago bas 
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20,
}

const pool = new Pool(db_config);
pool.on('connect', () => {
    console.log("database is connect");
})
pool.on('remove', () => {
  console.log("database connection removed");
})

module.exports = pool;
