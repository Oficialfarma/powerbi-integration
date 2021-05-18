import HandleOrdersUseCase from "./HandleOrdersUseCase";

export default class HandleOrdersController
{
    constructor(
        private createHandleOrdersControllers: HandleOrdersUseCase
    ){}

    handle(order: object)
    {
        const formatedOrders = this.createHandleOrdersControllers.execute(order);
        
        return formatedOrders;
    }
}