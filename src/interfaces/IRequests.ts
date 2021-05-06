export interface IRequestDatas
{
    url?: string;
    queryParams?: string;
    timeout: number;
}

export interface IRequests
{
    makeRequest(datas: IRequestDatas): Promise<void>;
    get(url?: string): Promise<object>;
    timeDelay(timeout: number): Promise<Error>;
}
