
import { readCSV } from  './dataProcessor';
import nconf from '../config';
import { HighestAndLowestPercentage, generateReports, individualReport, generateTopStudentsBySubject} from './reportGenerator';

async function main(){
  try{

    const MasterDataFilePath = nconf.get('MasterDataFilePath');
    const StudentMarksFilePath = nconf.get('StudentMarksFilePath');
    const StudentName = nconf.get('StudentName');

    const masterData  = await readCSV(MasterDataFilePath);
    const studentMarks = await readCSV(StudentMarksFilePath);

    if(StudentName){
      individualReport(masterData,studentMarks, StudentName )

    }
    else{
      console.log("Generating reports");
      generateReports(masterData, studentMarks);

      console.log("\nTop Performers")
      generateTopStudentsBySubject(masterData, studentMarks);

      console.log("\nHigh & Low");
      HighestAndLowestPercentage(masterData,studentMarks);
    }
  }catch(error){
    console.error('Error processing data:', error);
  }

  }
  main();
