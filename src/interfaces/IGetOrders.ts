import { IGetOrdersDTO } from "./IGetOrdersDTO";
import { OrdersDTO } from "./OrdersDTO";

export interface IGetOrders
{
    getOrders(datas: IGetOrdersDTO) : Promise<string[] | OrdersDTO[]>
}