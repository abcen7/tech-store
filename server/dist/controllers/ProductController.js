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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.create = exports.remove = exports.getOne = exports.getAll = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find().populate('tags');
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't get all products`);
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const product = yield Product_1.default.findById(productId).populate('tags');
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't get product`);
    }
});
exports.getOne = getOne;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        yield Product_1.default.findByIdAndRemove(productId);
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't get product`);
    }
});
exports.remove = remove;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = new Product_1.default({
            title: req.body.title,
            amount: req.body.amount,
            colors: req.body.colors,
            sizes: req.body.sizes,
            purchases: req.body.purchases,
            description: req.body.description,
            tags: req.body.tags,
            imagesUrl: req.body.imagesUrl,
        });
        const product = yield doc.save();
        res.status(201).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't create a product`);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        yield Product_1.default.findByIdAndUpdate(productId, {
            title: req.body.title,
            amount: req.body.amount,
            colors: req.body.colors,
            sizes: req.body.sizes,
            purchases: req.body.purchases,
            description: req.body.description,
            tags: req.body.tags,
            imagesUrl: req.body.imagesUrl,
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't edit a product`);
    }
});
exports.update = update;
