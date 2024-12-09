import MongoDB from "@/libs/mongodb";
import Bimbingan from "@/models/Bimbingan";
import { NextResponse } from "next/server";


class EvaluasiController {
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
      const evaluasi = await Bimbingan.findAll();
      return NextResponse.json(evaluasi, { status: 200 });
    } catch (error: any) {
      console.error("Error fetching DailyReports:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  validateCreatePayload(data: any) {
    const requiredFields = ["nim", "nip", "tanggal", "komentar", "status"];;
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return `${field} is required`;
      }
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

      const newBimbingan = await Bimbingan.create(data);
      return NextResponse.json(newBimbingan,{ status: 201 });
    } catch (error: any) {
      console.error("Error creating Evaluasi:", error);
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

      const updatedEvaluasi = await Bimbingan.update(_id, data);

      if (!updatedEvaluasi) {
        return NextResponse.json({ message: "Evaluasi not found" }, { status: 404 });
      }

      return NextResponse.json(updatedEvaluasi, { status: 200 });
    } catch (error: any) {
      console.error("Error updating Evaluasi:", error);
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

      const deletedEvaluasi = await Bimbingan.delete(_id);

      if (!deletedEvaluasi) {
        return NextResponse.json({ message: "Evaluasi not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Evaluasi deleted successfully" }, { status: 200 });
      
    } catch (error: any) {
      console.error("Error deleting Evaluasi:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

const evaluasiController = new EvaluasiController();

export async function GET() {
    const response = await evaluasiController.getAll();
    return response; // Kembalikan objek NextResponse langsung
  }
export async function POST(req: Request) {
  return evaluasiController.create(req);
}

export async function PUT(req: Request) {
  return evaluasiController.update(req);
}

export async function DELETE(req: Request) {
  return evaluasiController.delete(req);
}
