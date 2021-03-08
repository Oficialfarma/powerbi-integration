import { IGetOrdersDTO } from "../../interfaces/IGetOrdersDTO";
import { Requests } from "../../providers/Requests";
import { GetOrdersUseCase } from "./GetOrdersUseCase";

export class GetOrdersController
{
    constructor(
        private createGetOrdersuseCase: GetOrdersUseCase
    ){}

    async handle(datas: IGetOrdersDTO)
    {
        try
        {
            let response = await this.createGetOrdersuseCase.execute(datas);

            return response;
        }
        catch(err)
        {
            new Requests().requestErrors();
        }
    }
}