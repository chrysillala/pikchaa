import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Layout from "@/components/Layout";

export default function FavoritesPage() {
  return (
    <Layout>
      <Container
        maxWidth="md"
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <main>
          <Toolbar />
          <h1>Favorites</h1>
        </main>
      </Container>
    </Layout>
  );
}
