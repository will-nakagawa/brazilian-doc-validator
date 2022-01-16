"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cnpj = exports.cpf = void 0;
const cpf_1 = __importDefault(require("./src/validator/cpf"));
exports.cpf = cpf_1.default;
const cnpj_1 = __importDefault(require("./src/validator/cnpj"));
exports.cnpj = cnpj_1.default;
