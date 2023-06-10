import { useState } from "react";
import { useDebounce } from "use-debounce";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RWebShare } from "react-web-share";

import { appTitle, shareSites } from "@/constants";
import { searchPicturesByQuery } from "@/utils/api";
import { useGlobal } from "@/contexts/GlobalContext";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Layout from "@/components/Layout";
import CardDetail from "@/components/Card/CardDetail";

export default function Home() {
  const [pictureList, setPictureList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const hasNext = currentPage < totalPages;

  const [inputQuery, setInputQuery] = useState("");
  const [q] = useDebounce(inputQuery, 500);

  const [isLoading, setIsLoading] = useState(false);

  const { favoriteList, addFavoriteById } = useGlobal();
  const isFavorite = (id) =>
    favoriteList.findIndex((item) => item.id === id) > -1;

  const router = useRouter();
  const { id: picId } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const searchResults = await searchPicturesByQuery(q);
      setPictureList(searchResults.results);
      setTotalPages(searchResults.total_pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.message || "Error: Cannot search pictures");
    }
  };

  const handleClickFavorite = (e, id) => {
    e.stopPropagation();
    addFavoriteById(id);
  };

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
    setIsLoading(true);

    try {
      const searchResults = await searchPicturesByQuery(q, page);
      setPictureList(searchResults.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error?.message || "Error: Cannot search pictures");
    }
  };

  return (
    <Layout>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <Toolbar />
      <Container
        maxWidth="md"
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          sx={{
            maxWidth: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              backgroundColor: "#fff",
              mb: 3,
            }}
            hiddenLabel
            fullWidth
            variant="outlined"
            placeholder="Search picture"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.currentTarget.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    onClick={handleSubmit}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {isLoading
            ? "Loading..."
            : pictureList.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card>
                    <Link href={`/?id=${item.id}`} as={`/pictures/${item.id}`}>
                      <Image
                        src={item.urls.thumb}
                        width={500}
                        height={500}
                        loading="lazy"
                        alt={item.alt_description}
                      />
                      <CardHeader
                        title={item.alt_description}
                        subheader={item.user.name}
                      />
                    </Link>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={(e) => handleClickFavorite(e, item.id)}
                      >
                        <FavoriteIcon
                          sx={{ color: isFavorite(item.id) ? red[500] : "" }}
                        />
                      </IconButton>
                      <RWebShare
                        data={{
                          text: item.alt_description,
                          url: item.links.html,
                          title: "Share",
                        }}
                        sites={shareSites}
                        onClick={() => console.log("shared successfully!")}
                      >
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </RWebShare>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
        {totalPages > 0 && (
          <Box
            sx={{
              my: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        )}
        <Modal
          open={!!router.query.id}
          onClose={() => router.push("/")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CardDetail id={picId} />
          </Box>
        </Modal>
      </Container>
    </Layout>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
