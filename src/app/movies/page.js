"use client";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const Movies = () => {
  const { data: session } = useSession();
  const { loggedInAccount } = useContext(GlobalContext);
  
  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;

  return <div>movies page</div>;
};

export default Movies;
