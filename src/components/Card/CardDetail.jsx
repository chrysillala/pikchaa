import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { getPictureById } from "@/utils/api";

const CardDetail = ({ id }) => {
  const { status, data: item } = useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPictureById(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error :(</p>;
  }

  return (
    <Image
      src={item.urls.regular}
      width={500}
      height={500}
      loading="lazy"
      alt={item.alt_description}
    />
  );
};

export default CardDetail;
