import { Document, Schema, model, models, Types } from "mongoose";

// Interface definitions

export interface IDailyReport extends Document {
  _id: Types.ObjectId;
  tanggal: Date;
  agenda?: {
    waktuMulai: string;
    waktuSelesai: string;
    judulAgenda: string;
    deskripsiAgenda: string;
    files?: string[];
  }[];
}

// Schema definitions

const AgendaSchema = new Schema(
  {
    waktuMulai: { type: String, required: [true, "Waktu mulai diperlukan"] },
    waktuSelesai: { type: String, required: [true, "Waktu selesai diperlukan"] },
    judulAgenda: { type: String, required: [true, "Judul agenda diperlukan"] },
    deskripsiAgenda: { type: String, required: [true, "Deskripsi agenda diperlukan"] },
    files: [{ type: String }] 
  },
  { _id: false }
);

const DailyReportSchema = new Schema<IDailyReport>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    tanggal: { type: Date, required: [true, "Tanggal diperlukan"] },
    agenda: { type: [AgendaSchema], default: [] },
  }
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

class DailyReportClass {
  private model;

  constructor() {
    this.model = models.DailyReport || model<IDailyReport>("DailyReport", DailyReportSchema);
  }

  async create(data: Partial<IDailyReport>): Promise<IDailyReport> {
    const dailyReport = new this.model(data);
    return dailyReport.save();
  }

  async findAll(): Promise<IDailyReport[]> {
    return this.model.find({});
  }

  async findById(id: string): Promise<IDailyReport | null> {
    return this.model.findById(id);
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

  async findByIdAndUpdate(id: string, data: Partial<IDailyReport>, options: any) {
    return this.model.findByIdAndUpdate(id, data, options);
  }
}

export default new DailyReportClass();