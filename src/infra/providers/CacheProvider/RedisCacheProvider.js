const config = require('../../../config/cache');
const asyncRedis = require('async-redis');

const AppError = require('../../../errors/AppError');

class RedisCacheProvider {
  constructor() {
    this.client = asyncRedis.createClient(config.redis);

    this.client.on('error', error => {
      throw new AppError(`Redis client error: ${error}`);
    });
  }

  getClient() {
    return this.client;
  }

  async set(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }

  async get(key) {
    const value = await this.client.get(key);

    return JSON.parse(value);
  }
}

module.exports = RedisCacheProvider;
