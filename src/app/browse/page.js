"use client";

import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const Browse = () => {
  const { data: session } = useSession();

  const {loggedInAccount} = useContext(GlobalContext);
  
  console.log("session", session);
  
  if(session === null) return <Unauthpage/>
  if (loggedInAccount === null) return <MangeAccounts />;

  

  return <div>This is the browse page</div>;
};

export default Browse;
