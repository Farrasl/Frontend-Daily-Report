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
    if (!uri) {
      throw new Error("MongoDB URI is not provided");
    }

    if (!this.instance) {
      this.instance = new MongoDB();
    }

    if (!this.instance.connection) {
      try {
        const options: ConnectOptions = {
          serverSelectionTimeoutMS: 30000,
          autoIndex: false,
          retryWrites: true,
          w: 'majority'
        };

        console.log("Attempting to connect to MongoDB with URI:", 
          uri.replace(/:[^:]*@/, ':****@')); // Safely log URI without password

        this.instance.connection = await mongoose.connect(uri, options);
        console.log("MongoDB connected successfully");

        // Optional: Add connection event listeners
        mongoose.connection.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB disconnected');
        });

      } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        
        // Provide more detailed error handling
        if (error instanceof Error) {
          if (error.message.includes('ESERVFAIL')) {
            console.error("DNS resolution failed. Check your connection string and network.");
          } else if (error.message.includes('authentication')) {
            console.error("Authentication failed. Verify your credentials.");
          }
        }
        
        throw error;
      }
    }
  }

  // Optional: Method to close connection
  public static async disconnect(): Promise<void> {
    if (this.instance?.connection) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
      this.instance.connection = null;
    }
  }
}

export default MongoDB;