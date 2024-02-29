"use client";
import CircleLoader from "@/components/CircleLoader";
import CommonLayout from "@/components/CommonLayout";
import MangeAccounts from "@/components/MangeAccounts";
import Unauthpage from "@/components/Unauthpage";
import { GlobalContext } from "@/context";
import { getTVOrMoviesByGenre } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect } from "react";

const Movies = () => {
  const { data: session } = useSession();
  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext);


  useEffect(() => {
    const getAllMedias = async () => {
       const action = await getTVOrMoviesByGenre("movie", 28);
       const adventure = await getTVOrMoviesByGenre("movie", 12);
       const crime = await getTVOrMoviesByGenre("movie", 80);
       const comedy = await getTVOrMoviesByGenre("movie", 35);
       const family = await getTVOrMoviesByGenre("movie", 10751);
       const mystery = await getTVOrMoviesByGenre("movie", 9648);
       const romance = await getTVOrMoviesByGenre("movie", 10749);
       const scifiAndFantasy = await getTVOrMoviesByGenre("movie", 878);
       const war = await getTVOrMoviesByGenre("movie", 10752);
       const history = await getTVOrMoviesByGenre("movie", 36);
       const drama = await getTVOrMoviesByGenre("movie", 18);
       const thriller = await getTVOrMoviesByGenre("movie", 53);
       const horror = await getTVOrMoviesByGenre("movie", 27);
       const allFavorites = await getAllfavorites(
          session?.user?.uid,
          loggedInAccount?._id
       );

      setMediaData(
        [
          {
            title: "Action",
            medias: action,
          },
          {
            title: "Adventure",
            medias: adventure,
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
            title: "Horror",
            medias: horror,
          },
          {
            title: "History",
            medias: history,
          },
          {
            title: "Romance",
            medias: romance,
          },
          {
            title: "Sci-Fi and Fantasy",
            medias: scifiAndFantasy,
          },
          {
            title: "Thriller",
            medias: thriller,
          },
          {
            title: "War",
            medias: war,
          },
          {
            title: "Dramas",
            medias: drama,
          },
        ].map((item) => ({
          ...item,
          medias: item.medias.map((mediaItem) => ({
            ...mediaItem,
            type: "movie",
            addedToFavorites: allFavorites && allFavorites.length
              ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                -1
              : false,
          })),
        }))
      );
      setPageLoader(false);
    };

    getAllMedias();
  }, [loggedInAccount]);
  
  if (session === null) return <Unauthpage />;
  if (loggedInAccount === null) return <MangeAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
};

export default Movies;
