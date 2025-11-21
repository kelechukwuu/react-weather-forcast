import React, { useEffect, useState } from "react";
import dataApi from "../Services/GlobalApi.jsx";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from "../imports/index.jsx";
import { display } from "@mui/system";
import { green } from "@mui/material/colors";

const CityCard = () => {
  const savedCityString = localStorage.getItem("city");
  const savedCity = JSON.parse(savedCityString);
  const [storeCity, setStoredCity] = useState([]);

  useEffect(() => {
    savedData();
  }, []);
  const deleteItem = (id) => {
    const item = JSON.parse(localStorage.getItem("city"));
    const index = item.indexOf(id);
    if (index >= 0) {
      item.splice(index, 1);
      localStorage.setItem("city", JSON.stringify(item));
      alert("City Deleted Successfully")
    }
  };

  const savedData = async () => {
    for (const i of savedCity) {
      try {
        const resp = await dataApi(i);
        setStoredCity((prev) => {
          const exists = prev.some(
            (c) => c.location.name === resp.data.location.name
          );
          return exists ? prev : [...prev, resp.data];
        });
      } catch (e) {
        console.error(e);
      }
    }
  };


  return (
    <>
      <Box
        sx={{ m: 2, width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {storeCity?.map((i, key) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
                <CardContent>
                  <Box
                    sx={{ mb: 3, display: "grid", justifyContent: "center" }}
                  >
                    <Typography variant="h5">{i?.location?.name}</Typography>
                    <Typography variant="h2" color="primary.main">
                      {Math.round(i?.current?.temp_c ?? 0)}°C
                    </Typography>
                    <Box
                      component="img"
                      alt="icon"
                      src={`https:${i?.current?.condition?.icon}`}
                      sx={{ height: "60px", width: "60px" }}
                    />
                  </Box>

                  <Grid
                    container
                    spacing={2}
                    sx={{ maxWidth: "60%", mx: "auto", p: 2 }}
                  >
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Temperature
                      </Typography>
                      <Typography>
                        {Math.round(i?.current?.temp_c ?? 0)} C°
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        Feels Like
                      </Typography>
                      <Typography>
                        {Math.round(i?.current?.feelslike_c ?? 0)} C°
                      </Typography>
                    </Grid>
                    {/* ...repeat for other stats */}
                  </Grid>
                </CardContent>

                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "red", fontWeight: "bold" }}
                    onClick={() => deleteItem(i?.location?.name)}
                  >
                    Delete City
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default CityCard;
