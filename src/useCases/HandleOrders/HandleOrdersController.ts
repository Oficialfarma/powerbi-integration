import { OrdersDTO } from "../../interfaces/OrdersDTO";
import HandleOrdersUseCase from "./HandleOrdersUseCase";

export default class HandleOrdersController
{
    constructor(
        private createHandleOrdersControllers: HandleOrdersUseCase
    ){}

    async handle(orders: OrdersDTO[], method: 'update' | 'save' = 'save')
    {
        if(method === 'save')
        {
            return await this.createHandleOrdersControllers.execute(orders);
        }
        else
        {
            return await this.createHandleOrdersControllers.executeUpdate(orders);
        }
    }
}