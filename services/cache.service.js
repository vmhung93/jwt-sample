const NodeCache = require("node-cache");

const caching = new NodeCache({ stdTTL: 100, checkperiod: 120 });

/**
 * Sets a key value pair.
 */
const set = (key, value, ttl) => {
  return caching.set(key, value, ttl);
};

/**
 * Gets a saved value from the cache
 */
const get = (key) => {
  return caching.get(key);
};

/**
 * Get the cached value and remove the key from the cache
 */
const take = (key) => {
  return caching.take(key);
};

/**
 * Delete a key
 */
const remove = (key) => {
  return caching.del(key);
};

/**
 * Returns an array of all existing keys
 */
const keys = () => {
  return caching.keys();
};

/**
 * Returns boolean indicating if the key is cached
 * */
const hasKey = (key) => {
  return caching.has(key);
};

/**
 * Flush all data
 */
const flushAll = () => {
  caching.flushAll();
};

// module.exports = { set, get, take, remove, keys, hasKey, flushAll };
module.exports = { set, get, take, remove, keys, hasKey, flushAll };
