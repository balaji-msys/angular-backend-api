const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(process.env.MONGO_URI, "url");
    console.log("db connected successfully...");
  } catch (e) {
    console.log(e);
    const mongoose = require("mongoose");

    const connectDb = async () => {
      try {
        await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("db connected successfully...");
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
    };

    mongoose.connection.on("connected", () =>
      console.log("mongoose connected")
    );
    mongoose.connection.on("error", (err) => console.log(err.message));
    mongoose.connection.on("disconnected", () =>
      console.log("mongoose connection is disconnected")
    );

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    module.exports = connectDb;
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => console.log("mongoose connected"));
mongoose.connection.on("error", (err) => console.log(err.message));
mongoose.connection.on("disconnected", () =>
  console.log("mongoose connection is disconnected")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectDb;
