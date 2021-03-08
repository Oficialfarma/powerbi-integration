import { IRequestOptions } from "./IRequestOptions";

export interface IGetOrdersDTO
{
    methodType: "list" | "get";
    queryParams?: string;
    orderId?: string;
    url: string;
    options: IRequestOptions;
    timeout: number;
}