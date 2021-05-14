import HandleOrdersController from "./HandleOrdersController";
import HandleOrdersUseCase from "./HandleOrdersUseCase";
import HandleOrders from "./implementations/HandleOrders";

const handleOrders = new HandleOrders();
const createHandleOrdersUseCase = new HandleOrdersUseCase(handleOrders);
const createHandleOrdersController = new HandleOrdersController(createHandleOrdersUseCase);

export default createHandleOrdersController;