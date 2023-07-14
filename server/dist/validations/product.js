"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPatchValidation = exports.productCreateValidation = void 0;
const express_validator_1 = require("express-validator");
exports.productCreateValidation = [
    (0, express_validator_1.body)('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('amount', 'Enter the amount of product').isNumeric(),
    (0, express_validator_1.body)('colors', 'Enter the colors of product').optional().isArray(),
    (0, express_validator_1.body)('sizes', 'Enter the sizes of product').optional().isArray(),
    (0, express_validator_1.body)('purchases', 'Enter the purchases of product').optional().isNumeric(),
    (0, express_validator_1.body)('description', 'Enter the description of product').isString(),
    (0, express_validator_1.body)('tags', 'Enter the tags of product').optional().isArray(),
    (0, express_validator_1.body)('imagesUrl', 'Enter URL images of product').optional().isArray(),
];
exports.productPatchValidation = [
    (0, express_validator_1.body)('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
    (0, express_validator_1.body)('amount', 'Enter the amount of product').isNumeric(),
    (0, express_validator_1.body)('colors', 'Enter the colors of product').optional().isArray(),
    (0, express_validator_1.body)('sizes', 'Enter the sizes of product').optional().isArray(),
    (0, express_validator_1.body)('purchases', 'Enter the purchases of product').optional().isNumeric(),
    (0, express_validator_1.body)('description', 'Enter the description of product').isString(),
    (0, express_validator_1.body)('tags', 'Enter the tags of product').optional().isArray(),
    (0, express_validator_1.body)('imagesUrl', 'Enter URL images of product').optional().isArray(),
];
