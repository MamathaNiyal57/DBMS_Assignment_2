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
//import nconf from  'nconf';
const nconf_1 = __importDefault(require("nconf"));
const path = __importStar(require("path"));
nconf_1.default.argv({
    MasterDataFilePath: {
        alias: 'm',
        describe: 'Master Data',
        demandOption: false,
        type: 'string'
    },
    StudentMarksFilePath: {
        alias: 's',
        describe: 'student Data',
        demandOption: false,
        type: 'string'
    },
    StudentName: {
        alias: 'name',
        describe: 'student name',
        demandOption: false,
        type: 'string'
    }
})
    .env()
    .file({ file: path.join(__dirname, './config.json') });
exports.default = nconf_1.default;
