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

import Layout from "@/components/Layout";
import CardDetail from "@/components/Card/CardDetail";

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
