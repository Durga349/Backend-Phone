import app from "./app.js";
import "dotenv/config.js";
import connectDB from "./db.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
