"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const AccountForm = ({ handleSave, formData, setFormData, showAccountForm }) => {
  return (
    showAccountForm && (
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
            <input
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-[#e5b109] outline-none focus:outline-none"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData["name"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-[#e5b109] outline-none focus:outline-none"
              type="password"
              name="pin"
              placeholder="Enter your PIN"
              value={formData["pin"]}
              maxLength={4}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button
              onClick={handleSave}
              className="border p-4 bg-[#e5b109] outline-none rounded-lg text-lg font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default AccountForm;
