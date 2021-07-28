import redis from 'redis'
import pg from 'pg'
import { promisify } from 'util'

const config = {
    PORT: process.env.APP_PORT || 3000,
}
const pool =  new pg.Pool({
    user: process.env.POSTGRES_USER || 'test_user',
    host: process.env.PG_HOST,
    database: process.env.POSTGRES_DB || 'appdb',
    password: process.env.POSTGRES_PASSWORD || 'qwerty',
    port: 5432,
})
const redisCLient = redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: 6379
})
export const rds = {
    get: promisify(redisCLient.get).bind(redisCLient),
    set: promisify(redisCLient.set).bind(redisCLient),
    del: promisify(redisCLient.del).bind(redisCLient)
}

redisCLient.on('connect', () => {
    console.log('Redis client connected V3');
});

redisCLient.on("error", (error) => {
    console.error(error);
});
export const db = {
    query: (text,params) => pool.query(text,params)
}
export default config
