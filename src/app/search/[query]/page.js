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

const Search = () => {
  const { data: session } = useSession();
  const { loggedInAccount, searchResults, pageLoder, setSearchResults, setPageLoader } =
    useContext(GlobalContext);
  const params = useParams();

  useEffect(() => {
    const getSearchResults = async () => {
      const tvShows = await getTVorMovieSearchResults("tv", params.query);
      const movies = await getTVorMovieSearchResults("movie", params.query);

       setSearchResults([
          ...tvShows.filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          ).map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavorites: false,
          })),
          ...movies.filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          ).map((movieItem) => ({
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
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      viewport={{ once: true}}
    >

    </motion.div>
  );
};

export default Search;
