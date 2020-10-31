import Koa from 'koa'
import { query } from './Database'

const UserData = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.path !== '/api') {
    console.log(`UserData ignoring ${ctx.path}`)
    return await next()
  }
  console.log(`UserData serving ${ctx.query.user_code}`)
  const result = await query('SELECT * FROM user_data WHERE code=$1', [ ctx.query.user_code ])
  if (result.rowCount === 1) {
    await query('UPDATE user_data SET last_seen=NOW() WHERE code=$1', [ ctx.query.user_code ])
    ctx.body = {
      last_seen: result.rows[0].last_seen
    }
  } else {
    await query('INSERT INTO user_data (last_seen, code) VALUES(NOW(), $1)', [ ctx.query.user_code ])
    ctx.body = {
      last_seen: null
    }
  }
}

export default UserData
