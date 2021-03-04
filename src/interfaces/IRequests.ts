import { IRequestOptions } from "./IRequestOptions";

export interface IRequestDatas
{
    url: string;
    queryParams?: "" | string;
    options: IRequestOptions;
    timeout: number;
}

export interface IRequests
{
    makeRequest(datas: IRequestDatas): Promise<void>;
    get(url: string, options: IRequestOptions): Promise<void>;
    timeDelay(url: string, timeout: number): Promise<void>;
    errorTimeout(reject: (err: Error) => any, url: string): Promise<void>; 
}
