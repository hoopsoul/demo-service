export function bind(route, exempt) {
  const Hello = global.models.Hello

  const hello = async (req, res, next) => {
    try {
      const hi = req.query.hi || 'world'
      return res.json({ hello: Hello.say(hi) })
    } catch (err) {
      return next(err)
    }
  }

  exempt('/hello')

  route.get('/hello', hello) // 你好
}
