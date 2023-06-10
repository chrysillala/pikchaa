import Head from "next/head";
import { useRouter } from "next/router";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Layout from "@/components/Layout";
import CardDetail from "@/components/Card/CardDetail";

const PictureDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>Picture Detail</title>
      </Head>
      <Container
        maxWidth="md"
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <CardDetail id={id} />
      </Container>
    </Layout>
  );
};

export default PictureDetailPage;
