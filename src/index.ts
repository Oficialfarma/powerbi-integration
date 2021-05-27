import * as dotenv from 'dotenv';
dotenv.config();

import { fork } from 'child_process';
import { Database } from './repositories/Database';
import { DateFormat } from './utils/DateFormat';

(async function() {
    const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
    const db = new Database().createConnection();
    
    const lastTimeInDb = await db.select('lastTimeRequest').from('requestStatus').build();
    const { lastTimeRequest } = lastTimeInDb[0];
    
    const actualTimeRequest = DateFormat.dateFormatToQueryParams(new Date('2021-05-27T09:15:00'));
    const lastTime = DateFormat.dateFormatToQueryParams(new Date(lastTimeRequest));
    
    const queryParams = `?f_creationDate=creationDate%3A%5B${lastTime}%20TO%20${actualTimeRequest}%5D&per_page=100`;
    // const queryParams = ``;

    child.send(queryParams);

    child.on('exit', async (status: number) => {
        if(Boolean(status))
        {
            await db.update('requestStatus').set({
                lastTimeRequest: actualTimeRequest,
                requestStatus: 1
            }).where("id_status=1").build();
        }
        else
        {
            await db.update('requestStatus').set({
                requestStatus: 0
            }).where("id_status=1").build();
        }
    });
})();