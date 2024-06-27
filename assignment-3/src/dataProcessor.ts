import fs from 'fs';
import csvParser from 'csv-parser';

export function readCSV(filePath: string): Promise<any[]>{
  return new Promise((resolve,reject) =>{
    const results: any[] = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data:any) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
  });
}