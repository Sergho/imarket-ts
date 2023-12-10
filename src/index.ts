const express = require("express");
import { AppDataSource } from "./data-source";
import { ProductType } from "./entity/ProductType";
import { ErrorHandler } from "./middleware/ErrorHandler";
import routes from "./routes";
import "./utils/response/customSuccess";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/', routes);
app.use(ErrorHandler);

AppDataSource.initialize().then( async () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch((e) => {
    console.log(e);
})

export default app;