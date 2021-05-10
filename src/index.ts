import * as dotenv from 'dotenv';
dotenv.config();

import { fork } from 'child_process';
import { Database } from './repositories/Database';
import { DateFormat } from './utils/DateFormat';

(async function() {
    const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
    const db = Database.for().createConnection();

    const lastTimeInDb = await db.select('lastTimeRequest').from('requestStatus').build();

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

    child.on('exit', async (status) => {
        if(Boolean(status))
        {
            // erro - aqui chama o insert com a última data
        }
        else
        {
            // se a saída for bem sucedida, atualiza o último horário
        }
    });

})();