import connectDB from "@/database";
import Account from "@/models/account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();

    const { pin, accountId, uid } = await req.json();

    const getCurrentAccount = await Account.findOne({ _id: accountId, uid });

    if (!getCurrentAccount) {
      return NextResponse({
        status: false,
        message: "Account not found",
      });
    }

    const checkPin = await compare(pin, getCurrentAccount.pin);

    if (checkPin) {
      return NextResponse({
        status: true,
        message: "Welcome Back",
      });
    } else {
      return NextResponse({
        status: false,
        message: "Incorrect Pin",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse({
      status: false,
      message: "Something Went Wrong",
    });
  }
}
