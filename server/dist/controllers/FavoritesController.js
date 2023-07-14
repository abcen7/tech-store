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
exports.remove = exports.create = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const userId = req.params.userId;
        yield User_1.default.findByIdAndUpdate(userId, {
            $addToSet: {
                favorites: new mongoose_1.Types.ObjectId(productId),
            },
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't add to favorites`);
    }
});
exports.create = create;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const userId = req.params.userId;
        yield User_1.default.findByIdAndUpdate(userId, {
            $pull: {
                favorites: new mongoose_1.Types.ObjectId(productId),
            },
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't remove from favorites`);
    }
});
exports.remove = remove;
