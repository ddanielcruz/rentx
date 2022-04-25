import express from "express";
import swaggerUI from "swagger-ui-express";

import "./database";
import "./shared/container";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
