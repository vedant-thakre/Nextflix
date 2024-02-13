import connectDB from "@/database"
import Account from "@/models/account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req){
    try {
        await connectDB();
        
        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");

        const getAllAcoounts = await Account.find({ uid: id });

        if (getAllAcoounts) {
            return NextResponse.json({
                success: true,
                message: "Accounts fetched successfully",
                data: getAllAcoounts,
            });
        } else {
            return NextResponse.json({
              success: false,
              message: "Failed to fetch accounts",
            });
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
          success: false,
          message: "Something Went Wrong",
        });
    }
}