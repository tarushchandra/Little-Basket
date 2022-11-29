import axios from "axios";

export const getRefreshToken = async (_id) => {
  try {
    const res = await axios.post("http://localhost:5000/api/jwt/refresh", {
      _id,
    });
    console.log("refresh - ", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
