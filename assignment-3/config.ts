
//import nconf from  'nconf';
import nconf from 'nconf'
import * as path from 'path';


nconf.argv({
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

export default nconf;