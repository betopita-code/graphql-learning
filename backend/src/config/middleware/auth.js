import jwt from 'jsonwebtoken'

export const getToken = payload => {

  let token = jwt.sign(payload, process.env.SEED, { expiresIn: process.env.EXPTOKEN })

  return token
}

export const checkToken = (req, res, next) => {

  const token = req.headers["x-token"]

  if (token) {

    try {

      const { user_loged, role, name } = jwt.verify(token, process.env.SEED)

      const newToken = getToken({ user_loged, role })

      req.user_loged = user_loged
      req.role = role
      req.name = name

      res.set("Access-Control-Expose-Headers", "x-token")
      res.set("x-token", newToken);

    } catch (e) {}
  }

  next()
}