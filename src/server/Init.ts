import { query } from './Database'

query('SELECT code, last_seen FROM user_data')
  .then(() => {
    console.log(`database up-to-date, no further action required`)
  })
  .catch((error) => {
    if (error.code === '42P01') {
      console.log(`user_data table doesn't exist, creating...`)
    } else {
      console.error(JSON.stringify(error))
    }
    return query(
      'DROP table IF EXISTS user_data; CREATE table user_data ( code CHAR(20) PRIMARY KEY, last_seen TIMESTAMP )'
    )
  })
  .catch((error) => {
    console.error(error)
  })
  .then(() => {
    console.log(`finished`)
  })
