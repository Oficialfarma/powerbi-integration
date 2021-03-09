import { IGetOrdersDTO } from "./IGetOrdersDTO";

export interface IGetOrders
{
    getOrders(datas: IGetOrdersDTO) : Promise<void>
}