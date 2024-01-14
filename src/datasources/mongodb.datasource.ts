import { lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as fs from 'fs';
import debugFactory from 'debug';

const debug = debugFactory('api-core:datasource:mongodb');

interface MongoConfigInterface {
  name: string;
  connector: string;
  url: string;
  ssl: boolean;
  sslValidate: boolean;
  sslCA?: string;
  useUnifiedTopology: boolean;
  connectionTimeout: number;
  allowExtendedOperators: boolean;
}

const config: MongoConfigInterface = {
  name: 'mongodb',
  connector: 'mongodb',
  url: process.env.MONGODB_URL ?? '',
  ssl: process.env.MONGODB_SSL === 'true',
  sslValidate: true,
  useUnifiedTopology: true,
  connectionTimeout: 10000,
  allowExtendedOperators: true,
};

if (config.ssl) {
  const caFilePath = process.env.MONGODB_SSL_CA_PATH ?? '';
//  config.sslCA = caFilePath;
   if (caFilePath) {
     try {
       const caFileContent = fs.readFileSync(caFilePath, 'utf8');
       config.sslCA = caFileContent;
       debug('SSL CA file loaded:', caFilePath);
     } catch (e) {
       debug('Error reading SSL CA file:', e);
     }
   }
}

@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'mongodb';

  constructor() {
    super(config);
  }

  // Example: Overriding a method to add error handling
  connect(): Promise<void> {
    return super.connect().catch(err => {
      debug('Error connecting to MongoDB:', err);
      throw err; // Re-throw the error for upstream handling
    });
  }

  /**
   * Start the datasource when the application is started
   */
  start(): void {
    debug('MongoDB DataSource started');
  }

  /**
   * Disconnect the datasource when the application is stopped.
   * This allows the application to be shut down gracefully.
   */
  stop(): Promise<void> {
    debug('Disconnecting MongoDB DataSource');
    return super.disconnect();
  }
}

