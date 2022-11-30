import axios from "axios";

export const getRefreshToken = async (_id) => {
  try {
    const res = await axios.post(
      "https://little-basket.onrender.com/api/jwt/refresh",
      {
        _id,
      }
    );
    console.log("refresh - ", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
