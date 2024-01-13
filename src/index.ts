import { MongodbDataSource } from './datasources/mongodb.datasource';

async function main() {
  const ds = new MongodbDataSource();
  try {
    await ds.connect();
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Failed to connect to MongoDB.', err);
  } finally {
    await ds.disconnect();
  }
}

main();
