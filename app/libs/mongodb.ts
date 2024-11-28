import mongoose from "mongoose";

class MongoDB {
  private static instance: MongoDB;
  private connection: typeof mongoose | null = null;

  private constructor() {}

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public static async connect(
    uri: string = process.env.MONGODB_URI || ""
  ): Promise<void> {
    if (!this.instance) {
      this.instance = new MongoDB();
    }

    if (!this.instance.connection) {
      try {
        this.instance.connection = await mongoose.connect(uri);
        console.log("MongoDB connected");
      } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
      }
    }
  }
}

export default MongoDB;
