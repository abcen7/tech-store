"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.tagCreateValidation = [
    (0, express_validator_1.body)('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
];
