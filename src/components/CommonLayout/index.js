"use client"
import React from 'react'
import { motion } from 'framer-motion';
import Navbar from '../Navbar';

const CommonLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
        <Head>
            <title>Netflix</title>
            {/* to dot add all other properties */}

        </Head>
        <>
        <Navbar/>
        <div className='relative pl-4 pb-24 lg:space-y-24'>

        </div>
        </>
    </motion.div>
  );
}

export default CommonLayout