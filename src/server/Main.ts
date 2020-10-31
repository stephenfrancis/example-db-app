import Koa from 'koa'
import KoaStatic from 'koa-static'
import UserData from './UserData'

const app = new Koa()

app.use(UserData)

app.use(
  KoaStatic('dist/', {
    maxAge: 365 * 24 * 60 * 60 * 1000,
  })
)

const server = app.listen(process.env.PORT || 3000)
