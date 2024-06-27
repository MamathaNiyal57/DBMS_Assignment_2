"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataProcessor_1 = require("./dataProcessor");
const config_1 = __importDefault(require("../config"));
const reportGenerator_1 = require("./reportGenerator");
async function main() {
    try {
        // nconf.file({ file: path.join(__dirname, 'config.json') });
        const MasterDataFilePath = config_1.default.get('MasterDataFilePath');
        const StudentMarksFilePath = config_1.default.get('StudentMarksFilePath');
        const StudentName = config_1.default.get('StudentName');
        const masterData = await (0, dataProcessor_1.readCSV)(MasterDataFilePath);
        const studentMarks = await (0, dataProcessor_1.readCSV)(StudentMarksFilePath);
        if (StudentName) {
            (0, reportGenerator_1.individualReport)(masterData, studentMarks, StudentName);
        }
        else {
            console.log("Generating reports");
            (0, reportGenerator_1.generateReports)(masterData, studentMarks);
            console.log("\nTop Performers");
            (0, reportGenerator_1.generateTopStudentsBySubject)(masterData, studentMarks);
            console.log("\nHigh & Low");
            (0, reportGenerator_1.HighestAndLowestPercentage)(masterData, studentMarks);
        }
    }
    catch (error) {
        console.error('Error processing data:', error);
    }
}
main();
