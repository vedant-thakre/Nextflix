"use client";
import CircleLoader from "@/components/CircleLoader";
import CommonLayout from "@/components/CommonLayout";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { getTVOrMoviesByGenre } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

const page = () => {
  const { data: session } = useSession();
  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext);

  useEffect(() => {
    const getAllMedias = async() => {
      const actionAdventure = await getTVOrMoviesByGenre("tv", 10759);
      const crime = await getTVOrMoviesByGenre("tv", 80);
      const comedy = await getTVOrMoviesByGenre("tv", 35);
      const family = await getTVOrMoviesByGenre("tv", 10751);
      const mystery = await getTVOrMoviesByGenre("tv", 9648);
      const reality = await getTVOrMoviesByGenre("tv", 10764);
      const scifiAndFantasy = await getTVOrMoviesByGenre("tv", 10765);
      const war = await getTVOrMoviesByGenre("tv", 10768);
      const western = await getTVOrMoviesByGenre("tv", 37);
      const dramaMovies = await getTVOrMoviesByGenre("tv", 18);

      setMediaData(
        [
          {
            title: "Action and adventure",
            medias: actionAdventure,
          },
          {
            title: "Crime",
            medias: crime,
          },
          {
            title: "Comedy",
            medias: comedy,
          },
          {
            title: "Family",
            medias: family,
          },
          {
            title: "Mystery",
            medias: mystery,
          },
          {
            title: "Reality",
            medias: reality,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiAndFantasy,
          },
          {
            title: "Western",
            medias: western,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Dramas",
            medias: dramaMovies,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "tv",
            addedToFavorites: false,
              // allFavorites && allFavorites.length
              //   ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
              //     -1
              //   : false,
          })),
        }))
      );
      setPageLoader(false);
    }

    getAllMedias();
  }, [loggedInAccount])
  

  if(session === null) return <Unauthpage />;
  if(loggedInAccount === null) return <MangeAccounts />;
  if(pageLoader) return <CircleLoader/>

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData}/>
    </main>
  );
};

export default page;
