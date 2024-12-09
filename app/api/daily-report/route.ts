import MongoDB from "@/libs/mongodb";
import DailyReport, { IDailyReport } from "@/models/DailyReport";
import { NextResponse } from "next/server";
import fs from "fs";
import GridFS from "@/models/GridFS"; // Mengimpor kelas GridFS
import { UpdateQuery } from "mongoose";  // Impor UpdateQuery

class DailyReportController {
  private gridFs: GridFS;

  constructor() {
    this.gridFs = new GridFS(process.env.MONGO_URI!, "test"); // Ganti dengan URI dan nama database yang sesuai
  }

  async connectDB() {
    try {
      await MongoDB.connect(); // Menghubungkan ke database
    } catch (error) {
      console.error("Database connection failed:", error);
      throw new Error("Unable to connect to the database.");
    }
  }

  async getAll() {
    await this.connectDB();
    try {
      const dailyReports = await DailyReport.findAll();
      return NextResponse.json(dailyReports, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching DailyReports:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  validateCreatePayload(data: any) {
    const requiredFields = ["tanggal", "status", "agenda"];

    for (const field of requiredFields) {
      if (!data[field]) {
        return `${field} is required`;
      }
    }

    if (Array.isArray(data.agenda)) {
      for (const agenda of data.agenda) {
        const agendaFields = [
          "waktuMulai",
          "waktuSelesai",
          "judulAgenda",
          "deskripsiAgenda",
        ];
        for (const field of agendaFields) {
          if (!agenda[field]) {
            return `${field} in agenda is required`;
          }
        }
      }
    } else {
      return "agenda must be an array";
    }

    return null;
  }

  async create(req: Request) {
    await this.connectDB();
    try {
      const data = await req.json();
      const validationError = this.validateCreatePayload(data);
      if (validationError) {
        return NextResponse.json({ message: validationError }, { status: 400 });
      }

      const newDailyReport = await DailyReport.create(data);
      return NextResponse.json(newDailyReport, { status: 201 });
    } catch (error: any) {
      console.error("Error creating DailyReport:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  async update(req: Request) {
    await this.connectDB();
    try {
      const { _id, ...data } = await req.json();

      if (!_id) {
        return NextResponse.json(
          { message: "ID (_id) is required" },
          { status: 400 }
        );
      }

      const updatedDailyReport = await DailyReport.update(_id, data);

      if (!updatedDailyReport) {
        return NextResponse.json(
          { message: "DailyReport not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(updatedDailyReport, { status: 200 });
    } catch (error: any) {
      console.error("Error updating DailyReport:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  async delete(req: Request) {
    await this.connectDB();
    try {
      const { searchParams } = new URL(req.url);
      const _id = searchParams.get("_id");

      if (!_id) {
        return NextResponse.json(
          { message: "ID (_id) is required" },
          { status: 400 }
        );
      }

      const deletedDailyReport = await DailyReport.delete(_id);

      if (!deletedDailyReport) {
        return NextResponse.json(
          { message: "DailyReport not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "DailyReport deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error deleting DailyReport:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  // Metode baru untuk mengunggah dokumentasi (gambar)
  async uploadDocumentation(req: Request) {
    await this.connectDB();
    try {
      const { dailyReportId, file } = await req.json(); // Mendapatkan file dan ID report dari payload
  
      if (!dailyReportId || !file) {
        return NextResponse.json(
          { message: "dailyReportId and file are required" },
          { status: 400 }
        );
      }
  
      // Menyimpan file ke GridFS
      const fileStream = fs.createReadStream(file.path); // Mengambil path file
      const fileId = await this.gridFs.uploadFile(
        file.name,
        fileStream,
        file.type
      );
  
      // Menggunakan findByIdAndUpdate untuk menggunakan $push dengan benar
      const updateQuery: UpdateQuery<IDailyReport> = {
        $push: {
          "agenda.$[].dokumentasi": {
            filePath: fileId,
            fileType: file.type,
          },
        },
      };
  
      // Pembaruan dengan menggunakan UpdateQuery
      await DailyReport.findByIdAndUpdate(dailyReportId, updateQuery, { new: true });
  
      return NextResponse.json({ fileId }, { status: 201 });
    } catch (error: any) {
      console.error("Error uploading documentation:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  
  
}

const dailyReportController = new DailyReportController();

export async function GET() {
  const response = await dailyReportController.getAll();
  return response;
}

export async function POST(req: Request) {
  return dailyReportController.create(req);
}

export async function PUT(req: Request) {
  return dailyReportController.update(req);
}

export async function DELETE(req: Request) {
  return dailyReportController.delete(req);
}

// Tambahkan endpoint baru untuk upload file
export async function POST_UPLOAD(req: Request) {
  return dailyReportController.uploadDocumentation(req);
}
