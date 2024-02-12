import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {

  mongoose
    .connect(process.env.MONGO_URI, configOptions)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(
        `Getting Error in connecting the database : ${err.message}`.yellow.bold
      );
    });
};

export default connectDB;
