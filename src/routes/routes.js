import { Router } from "express";
import productRouter from "./ProductRouter/ProductRouter.js";

const routes = new Router();

routes.get("/api/products", productRouter);

export default routes;
