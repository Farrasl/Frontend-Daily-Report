import MongoDB from "@/app/libs/mongodb";
import DailyReport from "@/app/models/DailyReport";
import { NextResponse } from "next/server";

class DailyReportController {
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
    const requiredFields = [
      "tanggal",
      "status",
      "agenda",
    ];

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
        return NextResponse.json({ message: "ID (_id) is required" }, { status: 400 });
      }

      const updatedDailyReport = await DailyReport.update(_id, data);

      if (!updatedDailyReport) {
        return NextResponse.json({ message: "DailyReport not found" }, { status: 404 });
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
        return NextResponse.json({ message: "ID (_id) is required" }, { status: 400 });
      }

      const deletedDailyReport = await DailyReport.delete(_id);

      if (!deletedDailyReport) {
        return NextResponse.json({ message: "DailyReport not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "DailyReport deleted successfully" }, { status: 200 });
    } catch (error: any) {
      console.error("Error deleting DailyReport:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

const dailyReportController = new DailyReportController();

export async function GET() {
  return dailyReportController.getAll();
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
