"use client"
import Unauthpage from '@/components/Unauthpage';
import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {

  const { data: session } = useSession();

  if (session === null) return <Unauthpage />;

  return (
    <div>
        TV
    </div>
  )
}

export default page