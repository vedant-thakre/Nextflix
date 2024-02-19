"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    PlusIcon,
    ChevronDownIcon,
    CheckIcon
} from '@heroicons/react/24/outline'

const base = "https://image.tmdb.org/t/p/w500";

const MediaItem = ({ media, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div
        className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px]
         transform transition duration-500 hover:scale-110 hover:z-[999]"
      >
        <Image
          src={`${base}${media?.backdrop_path || media?.poster_path}`}
          alt="media"
          layout="fill"
          className="rounded sm object-cover md:rounded hover:rounded-sm"
        />
      </div>
      <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
        <button>
          {media?.addedToFavorites ? (
            <CheckIcon color="#ffffff" className="h-7 w-7" />
          ) : (
            <PlusIcon color="#ffffff" className="h-7 w-7" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default MediaItem;
