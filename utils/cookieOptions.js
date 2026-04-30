const isProd = process.env.NODE_ENV === "production";

const accessTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "Strict",
  maxAge: 15 * 60 * 1000, // 15 min
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

module.exports = {
  accessTokenOptions,
  refreshTokenOptions,
};