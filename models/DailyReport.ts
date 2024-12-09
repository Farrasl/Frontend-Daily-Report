import { Document, Schema, model, models, Types } from "mongoose";

// Interface definitions
export interface IDokumentasi {
  dailyreportId?: Types.ObjectId;
  filePath: string;
  fileType: string;
  data?: Buffer; // Tambahan untuk menyimpan data file
}

export interface IDailyReport extends Document {
  _id: Types.ObjectId;
  tanggal: Date;
  status: string;
  agenda?: {
    waktuMulai: string;
    waktuSelesai: string;
    judulAgenda: string;
    deskripsiAgenda: string;
    dokumentasi?: IDokumentasi[];
  }[];
}

// Schema definitions
const DokumentasiSchema = new Schema<IDokumentasi>(
  {
    dailyreportId: {
      type: Schema.Types.ObjectId,
      ref: "DailyReport",
      required: false,
    },
    filePath: { type: String, required: [true, "File path is required"] },
    fileType: { type: String, required: [true, "File type is required"] },
    data: { type: Buffer, required: false }, // Tambahan untuk penyimpanan data
  },
  { 
    _id: false,
  }
);

const AgendaSchema = new Schema(
  {
    waktuMulai: { type: String, required: [true, "Start time is required"] },
    waktuSelesai: { type: String, required: [true, "End time is required"] },
    judulAgenda: { type: String, required: [true, "Title is required"] },
    deskripsiAgenda: { type: String, required: [true, "Description is required"] },
    dokumentasi: { type: [DokumentasiSchema], default: [] },
  },
  { 
    _id: false, 
  }
);

const DailyReportSchema = new Schema<IDailyReport>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    tanggal: { type: Date, required: [true, "Date is required"] },
    status: { type: String, required: [true, "Status is required"] },
    agenda: { type: [AgendaSchema], default: [] },
  },
);

DailyReportSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

// DailyReport Class dengan Tambahan Manajemen Dokumentasi
class DailyReportClass {
  private model;
  private dokumentasiModel;

  constructor() {
    this.model = models.DailyReport || model<IDailyReport>("DailyReport", DailyReportSchema);
    this.dokumentasiModel = models.Dokumentasi || model<IDokumentasi>("Dokumentasi", DokumentasiSchema);
  }

  // Metode Existing
  async create(data: Partial<IDailyReport>): Promise<IDailyReport> {
    const dailyReport = new this.model(data);
    return dailyReport.save();
  }

  async findAll(): Promise<IDailyReport[]> {
    return this.model.find({}).populate("_id");
  }

  async findById(id: string): Promise<IDailyReport | null> {
    return this.model.findById(id).populate("_id");
  }

  async update(
    id: string,
    data: Partial<IDailyReport>
  ): Promise<IDailyReport | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).populate(
      "_id"
    );
  }

  async delete(id: string): Promise<IDailyReport | null> {
    return this.model.findByIdAndDelete(id);
  }

  // Menambahkan metode findByIdAndUpdate
  async findByIdAndUpdate(id: string, data: Partial<IDailyReport>, options: any) {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  // Tambahan Metode Dokumentasi
  async tambahDokumentasi(
    dailyReportId: string, 
    agendaIndex: number, 
    dokumentasi: IDokumentasi
  ): Promise<IDailyReport | null> {
    try {
      // Temukan DailyReport berdasarkan ID
      const dailyReport = await this.model.findById(dailyReportId);

      if (!dailyReport) {
        throw new Error("Daily Report tidak ditemukan");
      }

      // Pastikan agenda index valid
      if (
        !dailyReport.agenda || 
        agendaIndex < 0 || 
        agendaIndex >= dailyReport.agenda.length
      ) {
        throw new Error("Indeks agenda tidak valid");
      }

      // Gunakan $push untuk menambah dokumentasi
      const updatedDailyReport = await this.model.findByIdAndUpdate(
        dailyReportId,
        {
          $push: {
            "agenda.$[agenda].dokumentasi": dokumentasi,
          },
        },
        {
          new: true, // Mendapatkan hasil setelah update
          arrayFilters: [{ "agenda._id": dailyReport.agenda[agendaIndex]._id }],
        }
      );

      return updatedDailyReport;
    } catch (error) {
      console.error("Gagal menambahkan dokumentasi:", error);
      return null;
    }
  }

  // Metode untuk mengambil dokumentasi berdasarkan ID Daily Report
  async getDokumentasi(dailyReportId: string): Promise<IDokumentasi[]> {
    const dailyReport = await this.model.findById(dailyReportId);
    
    if (!dailyReport) {
      throw new Error("Daily Report tidak ditemukan");
    }

    // Kumpulkan semua dokumentasi dari semua agenda
    const semuaDokumentasi: IDokumentasi[] = [];
    dailyReport.agenda?.forEach((agenda: { dokumentasi: any; }) => {
      if (agenda.dokumentasi) {
        semuaDokumentasi.push(...agenda.dokumentasi);
      }
    });

    return semuaDokumentasi;
  }
}

export default new DailyReportClass();
