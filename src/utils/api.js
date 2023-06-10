import { perPage } from "@/constants";
import request from "@/utils/request";

export const getPictures = async () => {
  const data = await request({
    method: "GET",
    url: "/photos",
  });

  return data;
};

export const getPictureById = async (id) => {
  const data = await request({
    method: "GET",
    url: `/photos/${id}`,
  });

  return data;
};

export const searchPicturesByQuery = async (q, page = 1) => {
  const data = await request({
    method: "GET",
    url: `/search/photos?query=${q}&per_page=${perPage}&page=${page}`,
  });

  return data;
};
