"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @MainLibs
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// @RolesChecks
const checkAuth_1 = __importDefault(require("./utils/checkAuth"));
const isAdmin_1 = __importDefault(require("./utils/isAdmin"));
// @Validations
const auth_1 = require("./validations/auth");
const product_1 = require("./validations/product");
const tag_1 = require("./validations/tag");
// @Controllers
const UserController = __importStar(require("./controllers/UserController"));
const ProductController = __importStar(require("./controllers/ProductController"));
const TagController = __importStar(require("./controllers/TagController"));
const FavoritesController = __importStar(require("./controllers/FavoritesController"));
// Getting .env params
require('dotenv').config();
console.log(process.env.MONGO_DB_LINK);
// Connecting to mongodb
mongoose_1.default
    .connect(process.env.MONGO_DB_LINK)
    .then(() => {
    console.log('Server has connected to database successfully');
})
    .catch(err => {
    console.log('Exception in connecting to database >> ', err);
});
const app = (0, express_1.default)();
const port = 5555;
app.use(express_1.default.json());
app.post('/auth/login', auth_1.authValidation, UserController.login);
app.post('/auth/register', auth_1.registerValidation, UserController.register);
app.get('/auth/me', checkAuth_1.default, UserController.authMe);
app.get('/products', checkAuth_1.default, ProductController.getAll);
app.get('/products/:id', checkAuth_1.default, ProductController.getOne);
app.post('/products', checkAuth_1.default, isAdmin_1.default, product_1.productCreateValidation, ProductController.create);
app.patch('/products/:id', checkAuth_1.default, isAdmin_1.default, product_1.productPatchValidation, ProductController.update);
app.delete('/products/:id', checkAuth_1.default, isAdmin_1.default, ProductController.remove);
app.post('/favorites/:userId/:productId', checkAuth_1.default, FavoritesController.create);
app.delete('/favorites/:userId/:productId', checkAuth_1.default, FavoritesController.remove);
app.get('/tags', checkAuth_1.default, TagController.getAll);
app.post('/tags', checkAuth_1.default, isAdmin_1.default, tag_1.tagCreateValidation, TagController.create);
app.delete('/tags/:id', checkAuth_1.default, isAdmin_1.default, TagController.remove);
app.listen(port, () => {
    console.log('Server running on port >> ' + port);
});
