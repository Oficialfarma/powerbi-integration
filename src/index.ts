import * as dotenv from 'dotenv';
dotenv.config();

import { fork } from 'child_process';
import { Database } from './repositories/Database';

// const child = fork(__dirname + '/initOrdersGeneration.ts', ['normal']);
(async function() {
    const db = Database.for().createConnection();
    const lastTime = await db.select('lastTimeRequest').from('requestStatus').build();
    
    console.log(lastTime)
})();

// child.on('exit', status => {
//     if(Boolean(status))
//     {
//         console.log('erro ', status)
//     }
// });