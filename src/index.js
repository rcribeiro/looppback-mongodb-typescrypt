"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_datasource_1 = require("./datasources/mongodb.datasource");
async function main() {
    const ds = new mongodb_datasource_1.MongodbDataSource();
    try {
        await ds.connect();
        console.log('Successfully connected to MongoDB.');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB.', err);
    }
    finally {
        await ds.disconnect();
    }
}
main();
