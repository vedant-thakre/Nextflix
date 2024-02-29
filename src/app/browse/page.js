"use client";

import CircleLoader from "@/components/CircleLoader";
import CommonLayout from "@/components/CommonLayout";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import {
  getAllfavorites,
  getPopularMedias,
  getTopRatedMedias,
  getTrendingMedias,
} from "@/utils";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

const Browse = () => {
  const { data: session } = useSession();

  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext);

  //console.log("session", session);

  useEffect(() => {
    const getAllMedias = async () => {
      const trendingTvShow = await getTrendingMedias("tv");
      const popularTvShow = await getPopularMedias("tv");
      const topRatedTvShow = await getTopRatedMedias("tv");

      const trendingMovieShow = await getTrendingMedias("movie");
      const popularMovieShow = await getPopularMedias("movie");
      const topRatedMovieShow = await getTopRatedMedias("movie");
      const allFavorites = await getAllfavorites(
        session?.user?.uid,
        loggedInAccount?._id
      );

      setMediaData([
        ...[
          {
            title: "Trending TV Shows",
            medias: trendingTvShow,
          },
          {
            title: "Popular TV Shows",
            medias: popularTvShow,
          },
          {
            title: "Top Rated TV Shows",
            medias: topRatedTvShow,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias?.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                  -1
                : false,
          })),
        })),
        ...[
          {
            title: "Trending Movies",
            medias: trendingMovieShow,
          },
          {
            title: "Popular Movies",
            medias: popularMovieShow,
          },
          {
            title: "Top Rated Movies",
            medias: topRatedMovieShow,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias?.map((mediaItem) => ({
            ...mediaItem,
            type: "movies",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                  -1
                : false,
          })),
        })),
      ]);
      setPageLoader(false);
    };
    getAllMedias();
  }, []);

  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;
  if (pageLoader) return <CircleLoader />;

  // console.log(mediaData);

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
};

export default Browse;
