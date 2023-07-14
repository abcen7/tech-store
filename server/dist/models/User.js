"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const mongoose_1 = require("mongoose");
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "ADMIN";
    UserRoles["USER"] = "USER";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
    favorites: {
        type: (Array),
        ref: 'Product',
        default: [],
    },
    role: {
        type: String,
        enum: UserRoles,
        default: UserRoles.USER,
    },
}, {
    timestamps: true,
});
exports.default = ((0, mongoose_1.model)('User', UserSchema));
