"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbDataSource = void 0;
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const fs = __importStar(require("fs"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('api-core:datasource:mongodb');
const config = {
    name: 'mongodb',
    connector: 'mongodb',
    url: (_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : '',
    ssl: process.env.MONGODB_SSL === 'true',
    sslValidate: true,
    useUnifiedTopology: true,
    connectionTimeout: 10000,
    allowExtendedOperators: true,
};
if (config.ssl) {
    const caFilePath = (_b = process.env.MONGODB_SSL_CA_PATH) !== null && _b !== void 0 ? _b : '';
    //  config.sslCA = caFilePath;
    if (caFilePath) {
        try {
            const caFileContent = fs.readFileSync(caFilePath, 'utf8');
            config.sslCA = caFileContent;
            debug('SSL CA file loaded:', caFilePath);
        }
        catch (e) {
            debug('Error reading SSL CA file:', e);
        }
    }
}
let MongodbDataSource = class MongodbDataSource extends repository_1.juggler.DataSource {
    constructor() {
        super(config);
    }
    // Example: Overriding a method to add error handling
    connect() {
        return super.connect().catch(err => {
            debug('Error connecting to MongoDB:', err);
            throw err; // Re-throw the error for upstream handling
        });
    }
    /**
     * Start the datasource when the application is started
     */
    start() {
        debug('MongoDB DataSource started');
    }
    /**
     * Disconnect the datasource when the application is stopped.
     * This allows the application to be shut down gracefully.
     */
    stop() {
        debug('Disconnecting MongoDB DataSource');
        return super.disconnect();
    }
};
exports.MongodbDataSource = MongodbDataSource;
MongodbDataSource.dataSourceName = 'mongodb';
exports.MongodbDataSource = MongodbDataSource = __decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    __metadata("design:paramtypes", [])
], MongodbDataSource);
