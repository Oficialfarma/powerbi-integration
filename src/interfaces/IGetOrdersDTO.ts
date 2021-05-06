export interface IGetOrdersDTO
{
    methodType: "list" | "get";
    url?: string;
    timeout: number;
    queryParams?: string;
    orderId?: string[];
    amountPages?: number;
}