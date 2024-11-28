import MongoDB from "@/app/libs/mongodb";
import DailyReport from "@/app/models/DailyReport";
import { NextResponse } from "next/server";

class DailyReportController {
  async getAll() {
    await MongoDB.connect(); // Correct usage of the static method
    try {
      const dailyReports = await DailyReport.findAll();
      return NextResponse.json(dailyReports, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching DailyReports:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  async create(req: Request) {
    await MongoDB.connect(); // Correct usage of the static method
    try {
      const data = await req.json();

      const requiredFields = [
        "tanggal",
        "waktuMulai",
        "waktuSelesai",
        "dokumentasi",
        "judulAgenda",
        "deskripsiAgenda",
        "status",
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          return NextResponse.json({ message: `${field} is required` }, { status: 400 });
        }
      }

      const newDailyReport = await DailyReport.create(data);
      return NextResponse.json(newDailyReport, { status: 201 });
    } catch (error: any) {
      console.error("Error creating DailyReport:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  async update(req: Request) {
    await MongoDB.connect(); // Correct usage of the static method
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
    await MongoDB.connect(); // Correct usage of the static method
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
