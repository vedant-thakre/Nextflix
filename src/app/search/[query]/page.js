"use client";
import Unauthpage from "@/components/Unauthpage";
import { useSession } from "next-auth/react";
import React from "react";

const Search = () => {
  const { data: session } = useSession();

  if (session === null) return <Unauthpage />;

  return <div>searchpage</div>;
};

export default Search;
