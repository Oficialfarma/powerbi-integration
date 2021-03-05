import { auth_config } from '../../vtex_authData.config';
import { IRequestDatas } from '../interfaces/IRequests';
import createFileSystemController from '../useCases/FileSystem';
import { DateFormat } from './DateFormat';

export class GetOptions
{
    static lastTimeRequest: any;
    
    constructor()
    {
        this.setLastTimeRequest();
    }

    urlOptions(): IRequestDatas
    {
        let finalTime = DateFormat.dateFormatToQueryParams(DateFormat.getActualTime());
        let initialTime = DateFormat.dateFormatToQueryParams(GetOptions.lastTimeRequest);

        return {
            url: `https://${auth_config.vtexAccountName}.vtexcommercestable.com.br/api/oms/pvt/orders`,
            queryParams: `?f_creationDate=creationDate%3A%5B${initialTime}%20TO%20${finalTime}%5D&per_page=100`,
            options: {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": auth_config['X-VTEX-API-AppKey'],
                    "X-VTEX-API-AppToken": auth_config['X-VTEX-API-AppToken']
                }
            },
            timeout: 10000
        }
    }

    async setLastTimeRequest()
    {
        let lastStatus = await createFileSystemController.handle({
            filePath: 'lastRequestStatus.json',
            methodName: 'read'
        });

        const { lastRequest } = JSON.parse(lastStatus); 
        GetOptions.lastTimeRequest = lastRequest;
    }

    static getLastTimeRequest(): string
    {
        return GetOptions.lastTimeRequest;
    }
}