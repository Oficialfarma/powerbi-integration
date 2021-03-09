import { GetOrdersController } from "./GetOrdersController";
import { GetOrdersUseCase } from "./GetOrdersUseCase";
import { GetOrders } from "./implementations/GetOrders";

const getOrders = new GetOrders();
const createGetOrdersUseCase = new GetOrdersUseCase(getOrders);
const createGetOrdersController = new GetOrdersController(createGetOrdersUseCase);

export default createGetOrdersController;