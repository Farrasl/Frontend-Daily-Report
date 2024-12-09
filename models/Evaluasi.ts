import { Document, Schema, model, models, Types } from "mongoose";

// Definisikan interface untuk dokumen EvaluasiDailyReport
export interface IEvaluasiDailyReport extends Document {
  dailyreportId?: Types.ObjectId;
  pembimbingInstansiId: string;
  komentar: string;
  status: string;
}

// Definisikan skema untuk model EvaluasiDailyReport
const EvaluasiDailyReportSchema = new Schema<IEvaluasiDailyReport>(
  {
    dailyreportId: {
      type: Schema.Types.ObjectId,
      ref: "DailyReport",
      required: true,
    },
    pembimbingInstansiId: { type: String, required: true },
    komentar: { type: String, required: true },
    status: { type: String, required: true },
  },
);

// Konfigurasi untuk JSON transformasi
EvaluasiDailyReportSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

// Class untuk melakukan operasi CRUD
class EvaluasiDailyReportClass {
  private model;


  constructor() {
    this.model =
      models.EvaluasiDailyReport ||
      model<IEvaluasiDailyReport>("EvaluasiDailyReport", EvaluasiDailyReportSchema);
  }

  // Fungsi baru untuk mencari EvaluasiDailyReport dengan informasi DailyReport
  async getEvaluasiWithDailyReport(evaluasiId: string) {
    return this.model.aggregate([
      {
        $match: { _id: new Types.ObjectId(evaluasiId) } // Mencari berdasarkan evaluasiId
      },
      {
        $lookup: {
          from: "dailyreports", // Nama koleksi DailyReport
          localField: "dailyreportId", // Field yang mengarah ke DailyReport
          foreignField: "_id", // Field yang ada di DailyReport
          as: "dailyReportInfo", // Nama field baru yang akan berisi informasi dari DailyReport
        }
      },
      {
        $unwind: "$dailyReportInfo" // Unwind jika hanya ada satu DailyReport terkait
      },
      {
        $project: {
          pembimbingInstansiId: 1,
          komentar: 1,
          status: 1,
          dailyReportInfo: 1, // Menampilkan informasi DailyReport yang digabungkan
        }
      }
    ]);
  }

  // Metode untuk membuat EvaluasiDailyReport baru
  async create(data: Partial<IEvaluasiDailyReport>): Promise<IEvaluasiDailyReport> {
    const evaluasiDailyReport = new this.model(data);
    return evaluasiDailyReport.save();
  }

  // Metode untuk mendapatkan semua data EvaluasiDailyReport
  async findAll(): Promise<IEvaluasiDailyReport[]> {
    return this.model.find({}).populate("_id"); 
  }

  // Metode untuk mencari data berdasarkan ID
  async findById(id: string): Promise<IEvaluasiDailyReport | null> {
    return this.model.findById(id).populate("_id"); 
  }

  // Metode untuk memperbarui data berdasarkan ID
  async update(
    id: string,
    data: Partial<IEvaluasiDailyReport>
  ): Promise<IEvaluasiDailyReport | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).populate("_id"); 
  }

  // Metode untuk menghapus data berdasarkan ID
  async delete(id: string): Promise<IEvaluasiDailyReport | null> {
    return this.model.findByIdAndDelete(id);
  }

  async updateStatusInDailyReport(evaluasiId: string, status: string): Promise<void> {
    const evaluasi = await this.model.findById(evaluasiId);
    if (!evaluasi || !evaluasi.dailyreportId) {
      throw new Error("Evaluasi atau DailyReport tidak ditemukan");
    }
  
    // Update status di DailyReport
    await models.DailyReport.findByIdAndUpdate(
      evaluasi.dailyreportId,
      { status },
      { new: true }
    );
  }
  
}

export default new EvaluasiDailyReportClass();
