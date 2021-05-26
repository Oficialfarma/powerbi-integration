import { OrdersDTO } from "../../interfaces/OrdersDTO";
import HandleOrdersUseCase from "./HandleOrdersUseCase";

export default class HandleOrdersController
{
    constructor(
        private createHandleOrdersControllers: HandleOrdersUseCase
    ){}

    async handle(order: OrdersDTO[])
    {
        const formatedOrders = await this.createHandleOrdersControllers.execute(order);
        
        return formatedOrders;
    }
}