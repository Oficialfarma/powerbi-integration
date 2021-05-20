import { OrdersDTO } from "../../interfaces/OrdersDTO";
import HandleOrdersUseCase from "./HandleOrdersUseCase";

export default class HandleOrdersController
{
    constructor(
        private createHandleOrdersControllers: HandleOrdersUseCase
    ){}

    handle(order: OrdersDTO[])
    {
        const formatedOrders = this.createHandleOrdersControllers.execute(order);
        
        return formatedOrders;
    }
}