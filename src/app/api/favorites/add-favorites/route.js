import connectDB from "@/database";
import Favorites from "@/models/favorites";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const isFavoriteExist = await Favorites.find({ uid:data.uid, movieID:data.movieID, accountID: data.accountID });

    if (isFavoriteExist && isFavoriteExist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Media already Exists",
      });
    }

    const newFavorites = await Favorites.create(data);

    if (newFavorites) {
      return NextResponse.json({
        success: true,
        message: "Added to favorites",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to Add to favorites",
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
