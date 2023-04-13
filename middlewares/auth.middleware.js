var jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json('Вы не авторизованы')
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
      return res.status(401).json('неверный тип токена')
    }

    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY)
    next()
  } catch (err) {
    return res.status(401).json('ошибочный токен от мидлвера')
  }
}
