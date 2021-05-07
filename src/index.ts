import * as dotenv from 'dotenv';
dotenv.config();

import { fork } from 'child_process';
import { Database } from './repositories/Database';
import { DateFormat } from './utils/DateFormat';

(async function() {
    const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
    const db = Database.for().createConnection();

    const lastTimeInDb = await db.from('requestStatus').select('lastTimeRequest').build();

    const { lastTimeRequest } = lastTimeInDb[0];
    
    const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-05T13:30:00'));
    const lastTime = DateFormat.dateFormatToQueryParams(new Date(lastTimeRequest));
    const queryParams = `?f_creationDate=creationDate%3A%5B${lastTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;

    child.send({
        queryParams,
        lastTime,
        actualTimeRequest
    });
    
    child.on('exit', status => {
        if(Boolean(status))
        {
            console.log('erro ', status)
        }
    });
})();
