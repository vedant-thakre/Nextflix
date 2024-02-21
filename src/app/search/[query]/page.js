"use client";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

const Search = () => {
  const { data: session } = useSession();
  const { loggedInAccount } = useContext(GlobalContext);
  const params = useParams();

  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;
  
  return <div>searchpage</div>;
};

export default Search;
