import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Header,
} from "./imports/index.jsx";
import dataApi from "./Services/GlobalApi.jsx";
import { display, flex, height, justifyContent, width } from "@mui/system";
import CityCard from "./Components/CityCard.jsx";

export default function App() {
  const [city, setCity] = useState("");
  const [cityForecast, setCityForecast] = useState("");

  const fetchData = () => {
    dataApi(city)
      .then((resp) => {
        setCityForecast(resp.data);
      })
      .catch((error) => console.log(error));
  };

  const saveItem = (id) => {
    try {
      const item = JSON.parse(localStorage.getItem("city") || "[]");
      item.push(id);
      localStorage.setItem("city", JSON.stringify(item));
      alert("City Added Successfully")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "30vh",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Container sx={{}}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "center",
              color: "#fff",
              marginTop: "2vh",
              marginBottom: "2vh",
            }}
          >
            Search for a weather forecasts
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Enter city"
              variant="outlined"
              size="small"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{
                input: { color: "#fff" }, // input text color
                label: { color: "#fff" },
              }}
            />
            <Button variant="contained" color="primary" onClick={fetchData}>
              Search
            </Button>
          </Box>
          <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ mb: 3, display: "grid", justifyContent: "center" }}>
                <Typography variant="h5">
                  {cityForecast?.location?.name}
                </Typography>
                <Typography variant="h2" color="primary.main">
                  {Math.round(cityForecast?.current?.temp_c ?? 0)}°C{" "}
                </Typography>
                <Box
                  component="img"
                  alt="icon"
                  src={`https:${cityForecast?.current?.condition?.icon}`}
                  sx={{ height: "60px", width: "60px" }}
                />{" "}
              </Box>

              <Grid
                container
                spacing={2}
                sx={{ maxWidth: "60%", mx: "auto", p: 2 }}
              >
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Temperature
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.temp_c ?? 0)} C°
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Feels Like
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.feelslike_c ?? 0)} C°
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Wind
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.wind_kph ?? 0)} kph
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Wind gust
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.wind_mph ?? 0)} mph
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Visibility
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.vis_km ?? 0)} km
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Humidity
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.humidity ?? 0)}%
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Pressure
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.pressure_in ?? 0)} hPa
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Precipitation
                  </Typography>
                  <Typography>
                    {Math.round(cityForecast?.current?.precip_in ?? 0)} mm/h
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "green", fontWeight: "bold" }}
                onClick={(e) => saveItem(cityForecast?.location?.name)}
              >
                Add City
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
      <CityCard />
    </>
  );
}
