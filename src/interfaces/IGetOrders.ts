import { IRequestOptions } from "./IRequestOptions";

export interface IGetOrders
{
    getOrders(
        url: string,
        options: IRequestOptions,
        methodType: string,
        timeout: number,
        queryParams?: string,
        orderId?: string[],
        amountPages?: number
    ) : Promise<void>
}