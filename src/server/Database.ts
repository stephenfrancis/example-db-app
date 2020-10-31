import { Pool, PoolClient, QueryResult } from 'pg'

const pool = new Pool()

export const query = (text: string, params: any): Promise<QueryResult<any>> => {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res && res.rowCount, err })
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export const getClient = (): Promise<[PoolClient, () => void]> => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
      }, 5000)
      const release = () => {
        // call the actual 'done' method, returning this client to the pool
        done()
        // clear our timeout
        clearTimeout(timeout)
      }
      if (err) {
        reject(err)
      } else {
        resolve([client, release])
      }
    })
  })
}
