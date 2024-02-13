import connectDB from "@/database"
import Account from "@/models/account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req){
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const id = searchParams.get("id");

        if(!id){
            return NextResponse.json({
              success: false,
              message: "Account Id is missing",
            });
        }

        const deletedAccount = await Account.findByIdAndDelete(id);

        if(deletedAccount){
            return NextResponse.json({
              success: true,
              message: "Account deleted successfully",
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