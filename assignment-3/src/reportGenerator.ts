import _ from 'lodash';
import {MasterData, StudentMarks } from './types';

function calculatePercentage(marksObtained: number, totalMarks: number): number {
  return (marksObtained / totalMarks) * 100;
}


export function generateReports(masterData: MasterData[], studentMarks: StudentMarks[]){
  const studentMap = _.groupBy(studentMarks, 'StudentName');
  const failedStudents: string[] = []; 
  Object.keys(studentMap).forEach(studentName => {
    const marks = studentMap[studentName];
    let totalMarks:number =0;
    let totalSubjects:number =0;
    if(marks.length >=5){
        marks.forEach(mark => {
          totalMarks += parseInt(mark.MarksObtained.toString());
          totalSubjects++;
        });
        const overallPercentage = calculatePercentage(totalMarks, totalSubjects * 100);
        const passOrFail = overallPercentage >= 40 ? 'Pass' : 'Fail';
  //failed students data
        if(overallPercentage < 40){
            failedStudents.push(studentName);
           }
        console.log(`Student: ${studentName}`);
        console.log(`Total Marks: ${totalMarks}`);
        console.log(`Overall Percentage: ${overallPercentage.toFixed(2)}%`);
        console.log(`Result: ${passOrFail}\n`);    
     }
    else{
        failedStudents.push(studentName);
    }
    });
    console.log(`Total number of students failed: ${failedStudents.length} ${failedStudents}`);
}
export function individualReport(masterData: MasterData[], studentMarks: StudentMarks[], StudentName: string){
    const studentGroupedData = _.groupBy(studentMarks, 'StudentName');
    const student = studentGroupedData[StudentName]

    const totalMarks = student.reduce ((sum, mark) => 
                                  sum + parseInt(mark.MarksObtained ? mark.MarksObtained.toString(): '0'),0
    );
    const possibleMarks = masterData.length * 100;
    const percentage = calculatePercentage(totalMarks, possibleMarks);

    const result = percentage >=40 && student.length >= 5 ? "Passed" : "Failed";

    const output = {
      StudentName: StudentName,
      totalMarks: `${totalMarks} out of ${possibleMarks}`,
      percentage: percentage,
      result : result
    };
    console.log(output);
}

export function generateTopStudentsBySubject(masterData: MasterData[], studentMarks: StudentMarks[]) {
  const subjectMap = _.groupBy(studentMarks, 'SubjectName');

  Object.keys(subjectMap).forEach(subjectName => {
    const marks = subjectMap[subjectName];
    const maxMarks = _.maxBy(marks, mark => parseInt(mark.MarksObtained, 10));

    if (maxMarks) {
      const topStudents = marks.filter(mark => mark.MarksObtained === maxMarks.MarksObtained)
                               .map(mark => mark.StudentName);

      console.log(`Subject: ${subjectName}`);
      console.log(`Top Students: ${topStudents}`);
    }
  });
}



export function HighestAndLowestPercentage(masterData: MasterData[], students: StudentMarks[]) {
  let highestPassPercentage = -1; 
  let highestPassSubject = '';  
  let lowestPassPercentage = 101; 
  let lowestPassSubject = '';    
  const subjectGroups = _.groupBy(students, 'SubjectName');

  masterData.forEach(subject => {
    const subjectName = subject.subjectName;
    const subjectRecords = subjectGroups[subjectName] || []
    let passCount = 0;
    subjectRecords.forEach(record => {
      const subjectObj = masterData.find(s => s.subjectName === record.SubjectName);
      if (subjectObj && parseInt(record.MarksObtained.toString()) >= subjectObj.passPercentage) {
        passCount++;
      }
    });
     if (subjectRecords.length > 0) {
      const passPercentage = (passCount / subjectRecords.length) * 100;
      if (passPercentage > highestPassPercentage) {
        highestPassPercentage = passPercentage;
        highestPassSubject = subjectName;
      }
      if (passPercentage < lowestPassPercentage) {
        lowestPassPercentage = passPercentage;
        lowestPassSubject = subjectName;
      }
    }
  });

  console.log(`Subject with highest pass percentage: ${highestPassSubject}: ${highestPassPercentage.toFixed(2)}%`);
  console.log(`Subject with lowest pass percentage: ${lowestPassSubject}:  ${lowestPassPercentage.toFixed(2)}%`);
}

//ts
//ts-node src/index.ts