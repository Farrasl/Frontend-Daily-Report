import { Document, Schema, model, models, Types } from "mongoose";

// Definisikan interface untuk dokumen Bimbingan
interface IBimbingan extends Document {
  nim: string;
  nip: string;
  tanggal: Date;
  komentar: string;
  status: string;
}

// Definisikan skema untuk model Bimbingan
const BimbinganSchema = new Schema<IBimbingan>(
  {
    nim: { type: String, required: false },
    nip: { type: String, required: false },
    tanggal: { type: Date, required: true },
    komentar: { type: String, required: true },
    status: { type: String, required: true },
  },
);

// Konfigurasi untuk JSON transformasi
BimbinganSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

// Class untuk melakukan operasi CRUD
class BimbinganClass {
  private model;

  constructor() {
    // Pastikan model hanya didefinisikan jika belum ada
    this.model =
      models.Bimbingan ||
      model<IBimbingan>("Bimbingan", BimbinganSchema);
  }

  // Metode untuk membuat Bimbingan baru
  async create(data: Partial<IBimbingan>): Promise<IBimbingan> {
    const Bimbingan = new this.model(data);
    return Bimbingan.save();
  }

  // Metode untuk mendapatkan semua data Bimbingan
  async findAll(): Promise<IBimbingan[]> {
    return this.model.find({}).populate("_id"); 
  }

  // Metode untuk mencari data berdasarkan ID
  async findById(id: string): Promise<IBimbingan | null> {
    return this.model.findById(id).populate("_id"); 
  }

  // Metode untuk memperbarui data berdasarkan ID
  async update(
    id: string,
    data: Partial<IBimbingan>
  ): Promise<IBimbingan | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).populate("_id"); 
  }

  // Metode untuk menghapus data berdasarkan ID
  async delete(id: string): Promise<IBimbingan | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default new BimbinganClass();
