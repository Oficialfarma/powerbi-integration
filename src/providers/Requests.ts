import fetch from "node-fetch";
import { IRequestOptions } from '../interfaces/IRequestOptions';
import { IRequestDatas, IRequests } from "../interfaces/IRequests";
import createFileSystemController from "../useCases/FileSystem";
import { GetOptions } from "../utils/GetOptions";

/**
 * @classdesc Create all requests to API vtex
 */
export class Requests implements IRequests
{
    /**
     * @param param0 an object with all url configurations
     * @returns a resolve or reject data
     */
    async makeRequest({ url, queryParams, options, timeout }: IRequestDatas): Promise<any>
    {
        return Promise.race([
            this.get(url + queryParams, options),
            this.timeDelay(timeout)
        ]);
    }

    /**
     * 
     * @param url
     * @param options request headers
     * @returns An object with orders detail
     */
    async get(url: string, options: IRequestOptions): Promise<void>
    {
        return new Promise((resolve, _reject) => {
            fetch(url, options)
                .then(resp => resolve(resp.json()))
                    .catch(async () => {
                        this.requestErrors();
                    });
        })
    }

    timeDelay(timeout: number): Promise<void>
    {
        return new Promise((_resolve, _reject) => {
            setTimeout(this.requestErrors, timeout);
        });
    }

    /**
     * 
     * @param reject reject function
     * @param url
     * @return an Error when the api returns spent more than timeout defined
     */
    async requestErrors()
    {
        return await createFileSystemController.handle({
            filePath: 'lastRequestStatus.json',
            methodName: 'write',
            errorMessage: {
                lastRequest: GetOptions.getLastTimeRequestFromJson().toString(),
                status: "failed"
            }
        });
    }
}