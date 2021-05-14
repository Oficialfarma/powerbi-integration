import HandleOrdersUseCase from "./HandleOrdersUseCase";

export default class HandleOrdersController
{
    constructor(
        private createHandleOrdersControllers: HandleOrdersUseCase
    ){}
}