const authService = require('../service/auth.service')
const {
  accessTokenOptions,
  refreshTokenOptions
} = require('../utils/cookieOptions')

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(201).json({
      message: 'User registered successfully'
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body
    )
    res
      .cookie('accessToken', accessToken, accessTokenOptions)
      .cookie('refreshToken', refreshToken, refreshTokenOptions)
      .status(200)
      .json({message:" Logged in successfully"
      })
  } catch (err) {
    next(err)
  }
}

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const newAccessToken = await authService.refresh(token)

    res
      .cookie('accessToken', newAccessToken, accessTokenOptions)
      .status(200)
      .json({ message: 'Token refreshed' })
  } catch (err) {
    next(err)
  }
}

const logout = (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json({ message: 'Logged out successfully' })
}

module.exports = {
  register,
  login,
  refresh,
  logout
}
