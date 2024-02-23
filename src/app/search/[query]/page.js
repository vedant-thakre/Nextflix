"use client";
import CircleLoader from "@/components/CircleLoader";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { getTVorMovieSearchResults } from "@/utils";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MediaItem from "@/components/MediaItem";

const Search = () => {
  const { data: session } = useSession();
  const {
    loggedInAccount,
    searchResults,
    pageLoder,
    setSearchResults,
    setPageLoader,
  } = useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    const getSearchResults = async () => {
      const tvShows = await getTVorMovieSearchResults("tv", params.query);
      const movies = await getTVorMovieSearchResults("movie", params.query);

      setSearchResults([
        ...tvShows
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavorites: false,
          })),
        ...movies
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movieItem) => ({
            ...movieItem,
            type: "movie",
            addedToFavorites: false,
          })),
      ]);
      setPageLoader(false);
      console.log(tvShows, movies);
    };
    getSearchResults();
  }, [loggedInAccount]);

  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;
  if (pageLoder) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar /> 
      {/*  The rest of the search page  */}
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results for {decodeURI(params.query)}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          { 
            searchResults && searchResults.length ? 
              searchResults.map((searchItem) => (
                <MediaItem key={searchItem.id} media={searchItem} searchView={true}/>
              ))
             : null
          } 
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
