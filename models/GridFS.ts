import mongoose, { Connection } from "mongoose";
import { GridFSBucket, MongoClient } from "mongodb";

class GridFS {
  private bucket: GridFSBucket | null = null;

  constructor(private dbUrl: string, private dbName: string) {}

  async connect(): Promise<GridFSBucket> {
    if (this.bucket) return this.bucket;

    const client = await MongoClient.connect(this.dbUrl);
    const database = client.db(this.dbName);

    this.bucket = new GridFSBucket(database);
    return this.bucket;
  }

  async uploadFile(fileName: string, fileStream: NodeJS.ReadableStream, contentType: string): Promise<string> {
    const bucket = await this.connect();

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(fileName, { contentType });
      fileStream.pipe(uploadStream)
        .on("error", (error) => reject(error))
        .on("finish", () => resolve(uploadStream.id.toString()));
    });
  }

  async downloadFile(fileId: string): Promise<NodeJS.ReadableStream> {
    const bucket = await this.connect();
    return bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));
  }

  async deleteFile(fileId: string): Promise<void> {
    const bucket = await this.connect();
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
  }
}

export default GridFS;
