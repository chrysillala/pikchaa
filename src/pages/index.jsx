import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Layout from "@/components/Layout";

export default function Home() {
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
          <div>search form</div>
          <div>search result</div>
        </main>
      </Container>
    </Layout>
  );
}
