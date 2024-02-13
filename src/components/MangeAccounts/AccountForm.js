"use client"

import { motion } from 'framer-motion';

const AccountForm = ({ formData, setFormData }) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div
        className="px-8 py-8 h-[300px] fixed top-[10px] gap-3 flex flex-col items-start right-[10px]
      bg-black opacity-[0.85] z-999"
      >
        <div className="flex flex-col gap-5 ">
          <input className="" type="text" name="name" />
        </div>
      </div>
    </motion.div>
  );
};

export default AccountForm;