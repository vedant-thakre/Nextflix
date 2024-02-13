import { signIn } from 'next-auth/react';
import React from 'react'

const Unauthpage = () => {
  return (
    <div>
        <button onClick={()=> signIn("github")}>Sign In</button>
    </div>
  )
}

export default Unauthpage;