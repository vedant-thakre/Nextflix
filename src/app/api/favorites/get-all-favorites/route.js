import connectDB from "@/database";
import Favorites from "@/models/favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const accountID = searchParams.get("accountID");
    
    const getFavorites = await Favorites.find({ uid: id, accountID });

    if (getFavorites) {
      return NextResponse.json({
        success: true,
        message: "Favorites fetched successfully",
        data: getFavorites,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch accounts",
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
