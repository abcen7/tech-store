"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    colors: {
        type: (Array),
        required: true,
        default: [],
    },
    sizes: {
        type: (Array),
        default: [],
    },
    purchases: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: (Array),
        ref: 'Tag',
        default: [],
    },
    imagesUrl: {
        type: (Array),
        default: [],
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
