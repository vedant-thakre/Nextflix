"use client";

import CommonLayout from "@/components/CommonLayout";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

const Browse = () => {
  const { data: session } = useSession();

  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext);

  //console.log("session", session);

  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;

  useEffect(() => {
    const getAllMedias = () => {
      
    }
  }, [])
  

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout />
    </main>
  );
};

export default Browse;
