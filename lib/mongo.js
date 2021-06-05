'use strict';

const { MongoClient, ObjectID } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = config.dbHost;
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
    this.connection = null;
  }

  async connect() {
    try {
      if (!this.connection) {
        this.connection = await this.client.connect();
        //eslint-disable-next-line
        console.log('DB Connection established ⚙️');
        return this.client.db(this.dbName);
      }

      return this.client.db(this.dbName);
    } catch (error) {
      throw new Error('Error trying to establish DB connection');
    }
  }

  async getAll(collection, query) {
    try {
      const dbInstance = await this.connect();
      return await dbInstance
        .collection(collection)
        .find(query || {})
        .toArray();
    } catch (error) {
      throw new Error('Error trying to retrieve information');
    }
  }

  async get(collection, id) {
    try {
      const dbInstance = await this.connect();
      return await dbInstance
        .collection(collection)
        .findOne({ _id: ObjectID(id) });
    } catch (error) {
      throw new Error('Error trying to retrieve information');
    }
  }

  async create(collection, data) {
    try {
      const dbInstance = await this.connect();
      return await (
        await dbInstance.collection(collection).insertOne(data)
      ).insertedId;
    } catch (error) {
      throw new Error('Error trying to save information');
    }
  }

  async update(collection, id, data) {
    try {
      const dbInstance = await this.connect();
      await dbInstance
        .collection(collection)
        .updateOne({ _id: ObjectID(id) }, { $set: data }, { upsert: true });
      return id;
    } catch (error) {
      throw new Error('Error trying to save information');
    }
  }

  async delete(collection, id) {
    try {
      const dbInstance = await this.connect();
      await dbInstance.collection(collection).deleteOne({ _id: ObjectID(id) });
      return id;
    } catch (error) {
      throw new Error('Error trying to retrieve information');
    }
  }
}

module.exports = MongoLib;
