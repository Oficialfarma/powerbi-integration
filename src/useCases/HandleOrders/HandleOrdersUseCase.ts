import { IHandleOrders } from "../../interfaces/IHandleOrders";

export default class HandleOrdersUseCase
{
    constructor(
        private HandleOrders: IHandleOrders
    ){}
}