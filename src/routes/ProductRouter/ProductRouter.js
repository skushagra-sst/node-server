import { Router } from "express";
import productController from "../../../src/controllers/productController";

const routes = new Router();

routes.get("/", productController.getAllProducts);
routes.post("/", productController.createProduct);
routes.get("/:id", productController.getProductById);
routes.put("/:id", productController.updateProduct);
routes.delete("/:id", productController.deleteProduct);
export default routes;
