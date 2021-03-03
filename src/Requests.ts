import fetch from "node-fetch";

interface IRequestHeaders
{
    Accept: string;
    "Content-Type": string;
    "X-VTEX-API-AppKey": string;
    "X-VTEX-API-AppToken": string;
}

interface IRequestDatas
{
    url: string;
    options: {
        method: string;
        headers: IRequestHeaders
    };
    timeout: number;
}

export class Requests
{
    makeRequest({ url, options, timeout }: IRequestDatas)
    {
        return fetch('url');
    }
}

// module.exports = Requests;