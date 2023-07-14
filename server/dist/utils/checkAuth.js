"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const token = (req.headers.authorization || '')
        .replace(/Bearer\s?/, '')
        .trim();
    try {
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decoded._id;
        }
        else {
            res.status(403).json({
                message: `User doesn't has access`,
            });
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Invalid access token',
        });
    }
};
