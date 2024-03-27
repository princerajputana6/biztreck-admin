import mongoose, { Connection } from "mongoose";

let connection: Connection;

// Connect to MongoDB
export function connectDB() {
  connection = mongoose.createConnection(process.env.MONGO_URL!, {
    tls: true,
    ssl: true,
  });

  connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });

  connection.once("open", () => {
    console.log("Database connected successfully");
  });

  return connection;
}

// Get the Mongoose connection instance
export function connect() {
  if (!connection) {
    connection = connectDB();
  }
  return connection;
}