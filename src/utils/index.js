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
