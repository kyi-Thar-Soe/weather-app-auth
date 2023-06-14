const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')
const cors = require('cors')
// /!\ Bind the router db to the app
app.db = router.db


const rules = auth.rewriter({
  // Permission rules
  users: 660,
  weather_history: 660,
  // Other rules
  '/posts/:category': '/posts?category=:category',
})
app.use(cors())
// You must apply the middlewares in the following order
app.use(rules)

// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
app.listen(3000)