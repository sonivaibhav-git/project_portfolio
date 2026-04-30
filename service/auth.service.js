const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token.js");
const UserRepo = require("../repositories/user.repo");

const register = async ({ email, password, username, name }) => {
    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepo.createUser({
        email,
        password: hashedPassword,
        username,
        name,
    });

    return user;
};

const login = async ({ email, password }) => {
    const user = await UserRepo.findByEmail(email);
    if (!user) {
        throw new Error("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
        user,
        accessToken,
        refreshToken,
    };
};

const refresh = async (token) => {
    if (!token) {
        throw new Error("Refresh token required");
    }

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("Invalid refresh token");
    }

    const user = await UserRepo.findById(payload.id);
    if (!user) {
        throw new Error("Invalid refresh token");
    }

    return generateAccessToken(user);
};

module.exports = {
    register,
    login,
    refresh,
};