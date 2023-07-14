"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 5 }),
    (0, express_validator_1.body)('fullName').isLength({ min: 3 }),
    (0, express_validator_1.body)('avatarUrl').optional().isURL(),
];
exports.authValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 5 }),
];
