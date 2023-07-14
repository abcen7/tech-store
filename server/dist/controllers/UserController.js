"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMe = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: req.body.email,
        });
        if (!user) {
            return res.status(404).json({
                message: `User wasn't found`,
            });
        }
        const isUserValid = yield bcrypt_1.default.compare(req.body.password, user._doc.passwordHash);
        if (!isUserValid) {
            return res.status(404).json({
                message: `Login or password are invalid`,
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });
        const _a = user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
        res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Can't authorize a user`,
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const password = req.body.password;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const doc = new User_1.default({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });
        const user = yield doc.save();
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });
        const _b = user._doc, { passwordHash } = _b, userData = __rest(_b, ["passwordHash"]);
        res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t register a user',
        });
    }
});
exports.register = register;
const authMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        if (!user) {
            res.status(404).json({
                message: `User wasn't found`,
            });
        }
        const _c = user === null || user === void 0 ? void 0 : user._doc, { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        const token = jsonwebtoken_1.default.sign({
            _id: user === null || user === void 0 ? void 0 : user._id,
            role: user === null || user === void 0 ? void 0 : user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        });
        res.status(200).json(Object.assign(Object.assign({}, userData), { token }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t get a user',
        });
    }
});
exports.authMe = authMe;
