import * as dotenv from 'dotenv';
dotenv.config();

import { CronJob } from 'cron';
import { fork } from 'child_process';
import { Database } from './repositories/Database';
import { DateFormat } from './utils/DateFormat';
import createFileSystemController from './useCases/FileSystem';

new CronJob('0 */30 * * * *', async () => {
    console.log('Buscando pedidos')
    const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
    const db = new Database().createConnection();
    
    const lastTimeInDb = await db.select('lastTimeRequest').from('requestStatus').build();
    const { lastTimeRequest } = lastTimeInDb[0];
    
    // const actualTime = new Date('2021-06-10T16:30:00.000Z');
    const actualTime = new Date();
    const actualTimeToRequest = DateFormat.dateFormatToQueryParams(actualTime);
    const lastTime = DateFormat.dateFormatToQueryParams(new Date(lastTimeRequest));
    
    const queryParams = `?f_creationDate=creationDate%3A%5B${lastTime}%20TO%20${actualTimeToRequest}%5D&per_page=100`;

    child.send(queryParams);

    child.on('exit', async (status: number) => {
        if(Boolean(status))
        {
            await db.update('requestStatus').set({
                lastTimeRequest: `'${actualTime.toISOString()}'`,
                requestStatus: 1
            }).where("id_status=1").build();
        }
        else
        {
            await db.update('requestStatus').set({
                requestStatus: 0
            }).where("id_status=1").build();
        }
        console.log('Baixou pedidos');
    });
}, null, true, 'America/Sao_Paulo');

new CronJob('0 */25 * * * *', async () => {
    const child = fork(__dirname + '/updateOrders.ts', ['normal']);
    console.log('Atualizando pedidos')
    child.on('exit', async (err: number | Error) => {
        if(Boolean(err))
        {
            const data = await createFileSystemController.handle({
                filePath: 'updateStatus.log',
                methodName: 'read'
            })
            .then(resp => resp)
            .catch(err => err);
            
            let message: string;

            if(data instanceof Error)
            {
                message = 'Orders have not been updated ' + new Date();
            }
            else
            {
                message = data + '\r\nOrders have been updated successfully ' + new Date();
            }
            await createFileSystemController.handle({
                filePath: 'updateStatus.log',
                methodName: 'write',
                errorMessage: message
            });
        }
        console.log('Atualizou pedidos');
    })
}, null, true, 'America/Sao_Paulo');