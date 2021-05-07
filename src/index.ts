import * as dotenv from 'dotenv';
dotenv.config();

import { fork } from 'child_process';
import { Database } from './repositories/Database';
import { DateFormat } from './utils/DateFormat';
import createFileSystemController from './useCases/FileSystem';

(async function() {
    const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
    const db = Database.for().createConnection();

    const lastTimeInDb = await db.from('requestStatus').select('lastTimeRequest').build();

    const { lastTimeRequest } = lastTimeInDb[0];
    
    const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-04T12:00:00'));
    const lastTime = DateFormat.dateFormatToQueryParams(new Date(lastTimeRequest));
    
    // const queryParams = `?f_creationDate=creationDate%3A%5B${lastTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
    const queryParams = ``;

    child.send({
        queryParams,
        lastTime,
        actualTimeRequest
    });
    
    let errorMessage: string;

    child.on('message', (message: string) => {
        if(message.indexOf('Error') !== -1)
        {
            errorMessage = message;
            writeLogError(message + new Date());
            child.disconnect();
        }
    });

    child.on('exit', async (status) => {
        if(Boolean(status))
        {
            writeLogError("An error has occurred");
        }
    });

})();

const retryWriteLogLimit = 5;

async function writeLogError(errorMessage: string)
{
    await createFileSystemController.handle({
        filePath: 'error.log',
        methodName: 'write',
        errorMessage
    }).then(() => {
        process.exit(0);
    }).catch((err) => {
        if(retryWriteLogLimit > 0)
        {
            setTimeout(writeLogError, 2000);
        }
        else
        {
            process.exit();
        }
    }); 
}