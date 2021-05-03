import { Method } from "axios";

export interface IRequestOptions
{
    method: Method;
    headers: {
        Accept: string;
        "Content-Type": string;
        "X-VTEX-API-AppKey": string;
        "X-VTEX-API-AppToken": string;
    }
}