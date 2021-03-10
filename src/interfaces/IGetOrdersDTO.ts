import { IRequestOptions } from "./IRequestOptions";

export interface IGetOrdersDTO
{
    methodType: "list" | "get";
    url: string;
    options: IRequestOptions;
    timeout: number;
    queryParams?: string;
    orderId?: string[] | object[];
    amountPages?: number;
}