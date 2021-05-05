import { IRequestOptions } from '../interfaces/IRequestOptions';
import { IRequestDatas, IRequests } from "../interfaces/IRequests";
import { api } from '../services/api';
import createFileSystemController from "../useCases/FileSystem";
import { GetOptions } from "../utils/GetOptions";

/**
 * @classdesc Create all requests to API vtex
 */
export class Requests implements IRequests
{
    /**
     * @description Throws a concurrent promise between
     * the request for the api or a timeout error
     * @param objectData - an object with all url configurations and timeout delay
     * @returns The promise to first respond, whether with success or error
     */
    async makeRequest({ url = "", queryParams = "", options, timeout }: IRequestDatas): Promise<any>
    {
        return Promise.race([
            this.get(options, url + queryParams),
            this.timeDelay(timeout)
        ]);
    }

    /**
     * @description makes a get request for the vtex api
     * @param url base url complement
     * @param options request headers
     * @returns An object with orders detail
     */
    async get(options: IRequestOptions, url?: string): Promise<object>
    {
        try
        {
            url = url || '';
            
            const { data } = await api.get(url, {
                method: options.method,
                headers: options.headers
            });
            
            return data;
        }
        catch(err)
        {
            return err;
        }
    }

    /**
     * @description throws an error after a certain time to
     * indicate that the api request was not successful
     * @param timeout - Limit time
     * @returns Timeout Error
     */
    timeDelay(timeout: number): Promise<Error>
    {
        return new Promise((_resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout error"));
            }, timeout);
        });
    }
}