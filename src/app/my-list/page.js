"use client";
import Unauthpage from "@/components/Unauthpage";
import { useSession } from "next-auth/react";
import React from "react";

const Mylist = () => {
  const { data: session } = useSession();

  if (session === null) return <Unauthpage />;

  return <div>mylist page</div>;
};

export default Mylist;
