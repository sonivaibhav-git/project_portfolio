const User = require('../models/user.model');

const createUser = (data) => {
    return User.create(data);
};

const findById = (id) => {
    return User.findById(id);
};

const findByEmail = (email) => {
    return User.findOne({ email }).select("+password");
};

module.exports = {
    createUser,
    findByEmail,
    findById,
};