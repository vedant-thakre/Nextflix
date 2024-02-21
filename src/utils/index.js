const BASE = process.env.BASE_URL;
const KEY = process.env.API_KEY;

// get trending media

export const getTrendingMedias = async (type) => {
  try {
    const res = await fetch(
      `${BASE}/trending/${type}/day?api_key=${KEY}&language=en-us`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    console.log(data);

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

// get top rated media

export const getTopRatedMedias = async (type) => {
  try {
    const res = await fetch(
      `${BASE}/${type}/top_rated?api_key=${KEY}&language=en-us`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    console.log(data);

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

// get popular media

export const getPopularMedias = async (type) => {
  try {
    const res = await fetch(
      `${BASE}/${type}/popular?api_key=${KEY}&language=en-us`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    console.log(data);

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};


export const getTVOrMoviesByGenre = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE}/discover/${type}?api_key=${KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    console.log(data);

    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};


export const getTVorMovieVideosByID = async (type, id) => {
  try {
    const res = await fetch(
      `${BASE}/${type}/${id}/videos?api_key=${KEY}&language=en-US&append_to_response=videos`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
export const getTVorMovieSearchResults = async (type, query) => {
  try {
    const res = await fetch(
      `${BASE}/search/${type}?api_key=${KEY}&include_adult=false&language=en-US&query=${query}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};