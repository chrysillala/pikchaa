import Head from "next/head";
import { useQuery } from "@tanstack/react-query";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Layout from "@/components/Layout";
import { useGlobal } from "@/contexts/GlobalContext";

import { getPictureById } from "@/utils/api";

const Item = ({ id }) => {
  const { status, data: item } = useQuery({
    queryKey: ["picture", id],
    queryFn: () => getPictureById(id),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Grid item xs={12}>
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 150, height: 150 }}
            image={item.urls.small}
            alt={item.alt_description}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {item.alt_description}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {item.user.name}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default function FavoritesPage() {
  const { favoriteList } = useGlobal();

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <Container
        maxWidth="md"
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Typography variant="h5" sx={{ py: 4 }}>
          Favorite List
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {favoriteList.length > 0 ? (
              favoriteList.map((item) => <Item id={item.id} key={item.id} />)
            ) : (
              <p>No Favorite Pictures</p>
            )}
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
}
