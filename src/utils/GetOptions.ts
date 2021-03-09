import { auth_config } from '../../vtex_authData.config';
import { IRequestDatas } from '../interfaces/IRequests';
import createFileSystemController from '../useCases/FileSystem';
import { DateFormat } from './DateFormat';

export class GetOptions
{
    static lastTimeRequestFromJson: Date;
    static actualTimeRequest: Date;

    urlOptions(method: string): IRequestDatas
    {
        let finalTime = DateFormat.dateFormatToQueryParams(GetOptions.actualTimeRequest);
        let initialTime = DateFormat.dateFormatToQueryParams(GetOptions.lastTimeRequestFromJson);

        return {
            url: `https://${auth_config.vtexAccountName}.vtexcommercestable.com.br/api/oms/pvt/orders`,
            queryParams: method === "listOrders" ?
                `?f_creationDate=creationDate%3A%5B${initialTime}%20TO%20${finalTime}%5D&per_page=100`
                : '',
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

    /**
     * @description set time of the last request status
     */
    async setLastTimeRequestFromJson()
    {
        let lastStatus = await createFileSystemController.handle({
            filePath: 'lastRequestStatus.txt',
            methodName: 'read'
        });

        const { lastRequest } = JSON.parse(lastStatus); 
        GetOptions.lastTimeRequestFromJson = new Date(lastRequest);
    }

    /**
     * @description set time of the actual request
     */
    setTimeActualRequest()
    {
        GetOptions.actualTimeRequest = new Date();
    }
    /**
     * 
     * @returns time of the actual request
     */
    static getTimeActualRequest()
    {
        return GetOptions.actualTimeRequest
    }

    /**
     * 
     * @returns last time request from json with last status
     */
    static getLastTimeRequestFromJson(): Date
    {
        return GetOptions.lastTimeRequestFromJson;
    }
}