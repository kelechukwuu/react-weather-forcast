import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Container,
  Link,
  CloudIcon,
  HomeIcon,
  FavoriteIcon,
} from "../imports/index.jsx";
const Header = () => {
  return (
      <Box>
        <Container maxWidth="md" sx={{ bgcolor: "grey.800", padding: "2vh" }}>
          <Grid container spacing={3}>
            <Grid
              size={5}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CloudIcon sx={{ color: "grey.200" }} />
              <Typography
                sx={{ marginTop: "5px", color: "grey.300", fontWeight: "bold" }}
              >
                Weather App
              </Typography>
            </Grid>
            <Grid
              size={7}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Link
                sx={{
                  color: "grey.300",
                  display: "flex",
                  gap: 1,
                  textDecoration: "none",
                }}
              >
                <HomeIcon />
                <Typography className=" !mt-1">Home</Typography>
              </Link>
              <Link
                sx={{
                  color: "grey.300",
                  display: "flex",
                  gap: 1,
                  textDecoration: "none",
                }}
              >
                <FavoriteIcon />
                <Typography className="!mt-1">Favourites</Typography>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}

export default Header