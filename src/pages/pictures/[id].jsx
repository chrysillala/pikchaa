import { useRouter } from "next/router";
import Toolbar from "@mui/material/Toolbar";

import Layout from "@/components/Layout";

const PictureDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Toolbar />
      <p>Picture Detail {id}</p>
    </Layout>
  );
};

export default PictureDetailPage;
