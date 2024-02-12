"use client";
import Unauthpage from "@/components/Unauthpage";
import { useSession } from "next-auth/react";
import React from "react";

const Browse = () => {
  const { data: session } = useSession();

  if(session === null) return <Unauthpage/>

  return <div>This is the browse page</div>;
};

export default Browse;
