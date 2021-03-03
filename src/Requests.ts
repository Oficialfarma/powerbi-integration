import fetch from "node-fetch";
import { IRequestOptions } from '../interfaces/IRequestOptions';

interface IRequestDatas
{
    url: string;
    queryParams?: "" | string;
    options: IRequestOptions;
    timeout: number;
}

export class Requests
{
    async makeRequest({ url, queryParams, options, timeout }: IRequestDatas): Promise<Object>
    {
        return Promise.race([
            this[options.method](url + queryParams, options),
            this.timeDelay(url, timeout)
        ]);
    }

    async get(url: string, options: IRequestOptions)
    {
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(resp => resolve(resp.json()))
                    .catch(() => reject(url));
        })
    }

    timeDelay(url: string, timeout: number)
    {
        return new Promise((resolve, reject) => {
            setTimeout(this.errorTimeout(reject, url), timeout);
        });
    }

    errorTimeout = (reject: (err: Error) => any, url: string) => () => reject(new Error(`Timeout at-${url}`));
}

// module.exports = Requests;