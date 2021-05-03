import { IRequestOptions } from "./IRequestOptions";

export interface IRequestDatas
{
    url?: string;
    queryParams?: string;
    options: IRequestOptions;
    timeout: number;
}

export interface IRequests
{
    makeRequest(datas: IRequestDatas): Promise<void>;
    get(options: IRequestOptions, url?: string): Promise<object>;
    timeDelay(timeout: number): Promise<void>;
    requestErrors(): Promise<string>; 
}
