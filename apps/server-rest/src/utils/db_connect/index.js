import * as dotenv from 'dotenv';
dotenv.config();
import { mongoDBClient } from '@progue/lib';


console.log('usr:', process.env.DATABASE_PWD_M);

const db_uri = `mongodb+srv://${process.env.DATABASE_USER_M}:${process.env.DATABASE_PWD_M}@${process.env.MONGO_CLUSTER}`;

const client = mongoDBClient(db_uri);

async function run() {
  try {
    const db = client.db('sample_mflix');
    const movies = db.collection('movies');

    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } catch (err) {
    throw err;
  } finally {
    // close client either way
    await client.close();
  }
}

run().catch(console.log);
