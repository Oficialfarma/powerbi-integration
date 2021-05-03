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
     * @param objectData - an object with all url configurations and timeout delay
     * @returns {Promise} the resolved promise from the get method or a timeout error
     */
    async makeRequest({ url, queryParams = "", options, timeout }: IRequestDatas): Promise<any>
    {
        return Promise.race([
            this.get(options, url + queryParams),
            this.timeDelay(timeout)
        ]);
    }

    /**
     * 
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

        // return new Promise(async (resolve, reject) => {

        //     await api.get(url, {
        //         method: options.method,
        //         headers: options.headers
        //     });


            // fetch(url, options)
            //     .then(resp => resolve(resp.json()))
            //         .catch(err => reject(err));
        // })
    }

    timeDelay(timeout: number): Promise<void>
    {
        return new Promise((_resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Timeout error"));
            }, timeout);
        });
    }

    /**
     * @description if there is an error in the requests, write the error
     * status and finish the execution
     * @returns Promise<void>
     */
    async requestErrors()
    {
        return await createFileSystemController.handle({
            filePath: 'lastRequestStatus.txt',
            methodName: 'write',
            errorMessage: {
                lastRequest: GetOptions.getLastTimeRequestFromJson().toString(),
                status: "failed"
            }
        });
    }
}