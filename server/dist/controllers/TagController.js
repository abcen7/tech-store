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
exports.create = exports.remove = exports.getAll = void 0;
const Tag_1 = __importDefault(require("../models/Tag"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield Tag_1.default.find();
        res.status(200).json(tags);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't get all tags`);
    }
});
exports.getAll = getAll;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = req.params.id;
        yield Tag_1.default.findByIdAndRemove(tagId);
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't remove the tag`);
    }
});
exports.remove = remove;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = new Tag_1.default({
            title: req.body.title,
        });
        const tag = yield doc.save();
        res.status(201).json(tag);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(`Can't create the tag`);
    }
});
exports.create = create;
