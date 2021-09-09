import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_PATH, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to database ${connection.connections[0].name}`);
  } catch (err) {
    console.log("Error connecting to database");
    console.log(err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Database  is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connectToDb;
