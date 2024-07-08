import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.db();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
    }
    db() {
        mongoose
            .connect(process.env.MONGO_URL)
            .then(() => {
                console.log("Connected to Mongo");
            })
            .catch(() => {
                console.log("An error has occured");
            });
    }
    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
