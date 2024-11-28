import { Document, Schema, model, models, Types } from "mongoose";

// Interface definitions
export interface IDokumentasi {
  dailyreportId?: Types.ObjectId;
  filePath: string;
  fileType: string;
}

export interface IDailyReport extends Document {
  tanggal: Date;
  waktuMulai: string;
  waktuSelesai: string;
  judulAgenda: string;
  deskripsiAgenda: string;
  status: string;
  dokumentasi?: IDokumentasi[];
}

// Schema definitions
const DokumentasiSchema = new Schema<IDokumentasi>({
  dailyreportId: {
    type: Schema.Types.ObjectId,
    ref: "DailyReport",
    required: false,
  },
  filePath: { type: String, required: true },
  fileType: { type: String, required: true },
});

const DailyReportSchema = new Schema<IDailyReport>(
  {
    tanggal: { type: Date, required: true },
    waktuMulai: { type: String, required: true },
    waktuSelesai: { type: String, required: true },
    judulAgenda: { type: String, required: true },
    deskripsiAgenda: { type: String, required: true },
    status: { type: String, required: true },
    dokumentasi: {type: [DokumentasiSchema], required: true}
  },
  {
    timestamps: true,
    _id: true,
    id: false,
  }
);

DailyReportSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id;
    return ret;
  },
});

// DailyReport Class
class DailyReportClass {
  private model;

  constructor() {
    this.model =
      models.DailyReport ||
      model<IDailyReport>("DailyReport", DailyReportSchema);
  }

  async create(data: Partial<IDailyReport>): Promise<IDailyReport> {
    const dailyReport = new this.model(data);
    return dailyReport.save();
  }

  async findAll(): Promise<IDailyReport[]> {
    return this.model.find({}).populate("dokumentasi.dailyreportId");
  }

  async update(
    id: string,
    data: Partial<IDailyReport>
  ): Promise<IDailyReport | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IDailyReport | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export default new DailyReportClass();
