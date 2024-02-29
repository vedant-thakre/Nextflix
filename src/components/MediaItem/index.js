"use client";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  PlusIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { getAllfavorites } from "@/utils";

const base = "https://image.tmdb.org/t/p/w500";

const MediaItem = ({ media, searchView = false, similarMovieView = false, listView = false }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();

  const {
    currentMediaInfoIdAndType,
    showDetailsPopUp,
    setShowDetailsPopUp,
    similarMedias,
    setSimilarMedias,
    loggedInAccount,
    setFavorites,
    searchResults,
    setSearchResults,
    setCurrentMediaInfoIdAndType,
  } = useContext(GlobalContext);


  const updateFavorites = async() => {
    const res = await getAllfavorites(session?.user?.uid, loggedInAccount?._id);
    if (res)
      setFavorites(
        res.map((item) => ({
          ...item,
          addedToFavorites: true,
        }))
      );
  }


  const handleAddToFavorites = async (item) => {
    const { backdrop_path, poster_path, id, type } = item;
    const res = await fetch("/api/favorites/add-favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backdrop_path,
        poster_path,
        movieID: id,
        type,
        uid: session?.user?.uid,
        accountID: loggedInAccount?._id,
      }),
    });

    const data = await res.json();

    if (data && data.success) {
      if (pathName.includes("my-list")) updateFavorites();
      if (searchView) {
        let updatedSearchResults = [...searchResults];
        const indexOfCurrentAddedMedia = updatedSearchResults.findIndex(
          (item) => item.id === id
        );

        updatedSearchResults[indexOfCurrentAddedMedia] = {
          ...updatedSearchResults[indexOfCurrentAddedMedia],
          addedToFavorites: true,
        };

        setSearchResults(updatedSearchResults);
      } else if (similarMovieView) {
        let updatedSimilarMedias = [...similarMedias];
        const indexOfCurrentAddedMedia = updatedSimilarMedias.findIndex(
          (item) => item.id === id
        );

        updatedSimilarMedias[indexOfCurrentAddedMedia] = {
          ...updatedSimilarMedias[indexOfCurrentAddedMedia],
          addedToFavorites: true,
        };

        setSimilarMedias(updatedSimilarMedias);
      } else {
        let updatedMediaData = [...mediaData];

        const findIndexOfRowItem = updatedMediaData.findIndex(
          (item) => item.title === title
        );

        let currentMovieArrayFromRowItem =
          updatedMediaData[findIndexOfRowItem].medias;
        const findIndexOfCurrentMovie = currentMovieArrayFromRowItem.findIndex(
          (item) => item.id === id
        );

        currentMovieArrayFromRowItem[findIndexOfCurrentMovie] = {
          ...currentMovieArrayFromRowItem[findIndexOfCurrentMovie],
          addedToFavorites: true,
        };

        setMediaData(updatedMediaData);
      }
    }

    console.log(data, "vedant");
  };

  const handleRemoveFavorites = async(item) => {

  }

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
         transform transition duration-500 hover:scale-110 hover:z-[500]"
      >
        <Image
          src={`${base}${media?.backdrop_path || media?.poster_path}`}
          alt="media"
          layout="fill"
          className="rounded sm object-cover md:rounded hover:rounded-sm"
          onClick={() => router.push(`/watch/${media?.type}/${media?.id}`)}
        />
        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            onClick={
              media?.addedToFavorites
                  ? () => handleRemoveFavorites(media)
                  : () => handleAddToFavorites(media)
            }
            className={`${
              media?.addedToFavorites && !listView && "cursor-not-allowed"
            } cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white   bg-black opacity-75 text-black`}
          >
            {media?.addedToFavorites ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button
            onClick={() => {
              setShowDetailsPopUp(true);
              setCurrentMediaInfoIdAndType({
                type: media?.type,
                id: listView ? media?.movieID: media?.id,
              });
            }}
            className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm
         font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 "
          >
            <ChevronDownIcon color="#ffffff" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaItem;
