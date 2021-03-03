export interface IRequestOptions
{
    method: string;
    headers: {
        Accept: string;
        "Content-Type": string;
        "X-VTEX-API-AppKey": string;
        "X-VTEX-API-AppToken": string;
    }
}