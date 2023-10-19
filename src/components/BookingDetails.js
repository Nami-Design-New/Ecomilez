import React from "react";
import { Grid, Box } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import QrCode from "react-qr-code";
import { colors } from "../components/Theme/WebTheme";
export default function BookingDetails(props) {
  const paramData = props.bookingData?.mainData;
  console.log("booking data", paramData);

  return (
    <Grid item xs={12}>
      {/* booking info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "5px",
        }}
      >
        <AccountCircleOutlinedIcon sx={{ fontSize: "40px", color: "gray" }} />
        <Box sx={{ color: colors.Black, fontSize: 16 }}>
          {paramData?.deliveryPerson}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "5px",
          marginLeft: "6px",
        }}
      >
        <PhoneInTalkOutlinedIcon sx={{ fontSize: "25px", color: "green" }} />
        <Box sx={{ fontSize: 15 }}>{paramData?.deliveryPersonPhone}</Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "5px",
          marginLeft: "6px",
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: "25px", color: "green" }} />
        <Box sx={{ fontSize: 15 }}>{paramData?.deliveryInstructions}</Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "5px",
          marginLeft: "6px",
        }}
      >
        <CircleIcon sx={{ fontSize: "25px", color: "green" }} />
        <Box sx={{ fontSize: 15 }}>{paramData?.pickup?.add}</Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
          gap: "5px",
          marginLeft: "6px",
        }}
      >
        <CircleIcon sx={{ fontSize: "25px", color: "red" }} />
        <Box sx={{ fontSize: 15 }}>{paramData?.drop?.add}</Box>
      </Box>

      {/* QR code */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "25px",
          marginBottom: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QrCode value={props.bookingData?.booking_id || ""} size={200} />
      </Box>
    </Grid>
  );
}
