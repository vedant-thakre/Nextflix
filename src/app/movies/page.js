"use client";
import Unauthpage from "@/components/Unauthpage";
import { useSession } from "next-auth/react";
import React from "react";

const Movies = () => {
  const { data: session } = useSession();

  if (session === null) return <Unauthpage />;

  return <div>movies page</div>;
};

export default Movies;
