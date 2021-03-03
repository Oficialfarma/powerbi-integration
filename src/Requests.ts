import fetch from "node-fetch";

interface IRequestOptions
{
    url: string;
    options: {
        method: string;
        headers: {
            Accept: string;
            "Content-Type": string;
            "X-VTEX-API-AppKey": string;
            "X-VTEX-API-AppToken": string;
        }
    };
    timeout: number;
}

export class Requests
{
    makeRequest({ url, options, timeout }: IRequestOptions)
    {
        return fetch('url');
    }
}

// module.exports = Requests;