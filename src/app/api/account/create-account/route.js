import connectDB from "@/database"
import Account from "@/models/account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req){
    try {
        await connectDB();

        const { name, pin, uid } = await req.json();

        const isExist = await Account.find({uid, name});

        const allAccounts = await Account.find({});

        if(isExist){
            return NextResponse({
            status: false,
            message: "Account already Exists"
            });
        }

        if (allAccounts && allAccounts.length === 4) {
          return NextResponse({
            status: false,
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
            return NextResponse({
            status: true,
            message: "Account created successfully",
            });
        }else{
            return NextResponse({
            status: false,
            message: "Failed to create account",
            });
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse({
            status: false,
            message: "Something Went Wrong"
        });
    }
}