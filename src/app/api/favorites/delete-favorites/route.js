import connectDB from "@/database";
import Favorites from "@/models/favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Item ID is missing",
      });
    }

    const deletedFavorites = await Favorites.findByIdAndDelete(id);

    if (deletedFavorites) {
      return NextResponse.json({
        success: true,
        message: "Account deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}
