import Navbar from "@/components/Navbar";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
