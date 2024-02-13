import connectDB from "@/database"
import Account from "@/models/account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req){
    try {
        await connectDB();

        const { name, pin, uid } = await req.json();

        const isExist = await Account.find({uid, name});

        const allAccounts = await Account.find({});

        if (isExist && isExist.length > 0) {
          return NextResponse.json({
            success: false,
            message: "Account already Exists",
          });
        }

        if (allAccounts && allAccounts.length === 4) {
          return NextResponse.json({
            success: false,
            message: "You've reached account limit",
          });
        }

       const hashPin = await hash(pin, 10);

        const newUser = await Account.create({
            name,
            pin:hashPin,
            uid
        })

        if(newUser){
            return NextResponse.json({
              success: true,
              message: "Account created successfully",
            });
        }else{
            return NextResponse.json({
              success: false,
              message: "Failed to create account",
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