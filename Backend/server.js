import { config } from "./src/config/config.js";
import app from "./src/app.js";
import databaseconnection from "./src/db/db.js";
import dotenv from 'dotenv'
dotenv.config()
console.log(config.JWT_SECRET_KEY)


databaseconnection();

app.listen(3000, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
