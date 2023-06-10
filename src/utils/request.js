import { BASE_URL } from "@/constants";
import axios from "axios";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  },
});

const request = (options) => {
  const requestOptions = options;

  const onSuccess = (response) => response.data;

  const onError = (error) => Promise.reject(error.response || error.message);

  return client(requestOptions).then(onSuccess).catch(onError);
};

export default request;
