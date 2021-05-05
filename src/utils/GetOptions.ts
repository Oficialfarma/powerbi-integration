import { IRequestDatas } from '../interfaces/IRequests';
import createFileSystemController from '../useCases/FileSystem';
import { DateFormat } from './DateFormat';

type Params = {
    method: 'listOrders' | 'getOrders';
    actualTimeRequest: Date;
    lastRequestTime: Date;
}

export class GetOptions
{
    urlOptions({ method, actualTimeRequest, lastRequestTime }: Params): IRequestDatas
    {
        let finalTime = DateFormat.dateFormatToQueryParams(actualTimeRequest);
        let initialTime = DateFormat.dateFormatToQueryParams(lastRequestTime);

        return {
            queryParams: method === "listOrders" ?
                `?f_creationDate=creationDate%3A%5B${initialTime}%20TO%20${finalTime}%5D&per_page=100`
                : '',
            options: {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VTEX-API-AppKey": process.env.X_VTEX_API_APPKEY,
                    "X-VTEX-API-AppToken": process.env.X_VTEX_API_APPTOKEN
                }
            },
            timeout: 10000
        }
    }
}