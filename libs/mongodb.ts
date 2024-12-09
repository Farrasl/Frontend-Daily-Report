import mongoose, { ConnectOptions } from "mongoose";

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
        // Gunakan opsi valid untuk koneksi
        const options: ConnectOptions = {
          serverSelectionTimeoutMS: 30000, // Waktu tunggu 30 detik
          autoIndex: false, // Nonaktifkan indeks otomatis
        };

        this.instance.connection = await mongoose.connect(uri, options);
        console.log("MongoDB connected");

        // Aktifkan debugging Mongoose (opsional)
        mongoose.set("debug", true);

      } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
      }
    }
  }
}

export default MongoDB;
