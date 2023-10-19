import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  MenuItem,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Modal,
  InputLabel
} from "@mui/material";
import GoogleMapsAutoComplete from "../components/GoogleMapsAutoComplete";
import { useSelector, useDispatch } from "react-redux";
import AlertDialog from "../components/AlertDialog";
import { makeStyles } from "@mui/styles";
import UsersCombo from "../components/UsersCombo";
import { api } from "common";
import Button from "components/CustomButtons/Button.js";
import { useTranslation } from "react-i18next";
import { colors } from "../components/Theme/WebTheme";
import { BookingModalBody, validateBookingObj } from "common/sharedFunctions";
import { useLocation } from "react-router-dom";
import BookingDetails from "../components/BookingDetails";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 480,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  container: {
    marginTop: theme.spacing(1),
    backgroundColor: colors.Header,
    alignContent: "center",
    borderRadius: "8px",
    width: "70%"
  },
  container1: {
    backgroundColor: colors.LandingPage_Background,
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    padding: "30px",
    width: "100%",
    top: "19px",
    boxShadow: "4px 4px 6px #9E9E9E"
  },
  title: {
    color: colors.LandingPage_Background,
    padding: "10px"
  },
  gridcontainer: {
    alignContent: "center"
  },
  items: {
    margin: 0,
    width: "100%"
  },
  input: {
    fontSize: 18,
    color: "#000"
  },
  inputdimmed: {
    fontSize: 18,
    color: "#737373"
  },
  carphoto: {
    height: "18px",
    marginRight: "10px"
  },
  carphotoRtl: {
    height: "16px",
    marginLeft: "10px"
  },
  buttonStyle: {
    margin: 0,
    width: "100%",
    height: 40,
    borderRadius: "30px",
    backgroundColor: colors.Header,
    color: "#FFF"
  },
  inputRtl: {
    "& label": {
      right: 25,
      left: "auto"
    },
    "& legend": {
      textAlign: "right",
      marginRight: 18
    }
  },
  rightRty: {
    "& legend": {
      marginRight: 30
    }
  }
}));

const menuLinesList = [
  { name: "Red sea Line" },
  { name: "Alexandria Line" },
  { name: "Portsaid Line" },
  { name: "Domiat Line" },
  { name: "Upper Egypt Line" }
];

const menuBoxesList = [
  {
    numberOfBoxes: 1
  },
  {
    numberOfBoxes: 2
  },
  {
    numberOfBoxes: 3
  },
  {
    numberOfBoxes: 4
  },
  {
    numberOfBoxes: 5
  },
  {
    numberOfBoxes: 6
  },
  {
    numberOfBoxes: 7
  },
  {
    numberOfBoxes: 8
  },
  {
    numberOfBoxes: 9
  },
  {
    numberOfBoxes: 10
  },
  {
    numberOfBoxes: 11
  },
  {
    numberOfBoxes: 12
  },
  {
    numberOfBoxes: 13
  },
  {
    numberOfBoxes: 14
  },
  {
    numberOfBoxes: 15
  },
  {
    numberOfBoxes: 16
  },
  {
    numberOfBoxes: 17
  },
  {
    numberOfBoxes: 18
  },
  {
    numberOfBoxes: 19
  },
  {
    numberOfBoxes: 20
  },
  {
    numberOfBoxes: 21
  },
  {
    numberOfBoxes: 22
  },
  {
    numberOfBoxes: 23
  },
  {
    numberOfBoxes: 24
  }
];

export default function AddBookings(props) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const {
    getEstimate,
    clearEstimate,
    addBooking,
    clearBooking,
    MinutesPassed,
    GetDateString,
    GetDistance
  } = api;
  const dispatch = useDispatch();
  const classes = useStyles();
  const cartypes = useSelector(state => state.cartypes.cars);
  const estimatedata = useSelector(state => state.estimatedata);
  const bookingdata = useSelector(state => state.bookingdata);
  const userdata = useSelector(state => state.usersdata);
  const auth = useSelector(state => state.auth);
  const settings = useSelector(state => state.settingsdata.settings);
  const [carType, setCarType] = useState(t("select_car"));
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropAddress, setDropAddress] = useState(null);
  const [optionModalStatus, setOptionModalStatus] = useState(false);
  const [estimateModalStatus, setEstimateModalStatus] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const [users, setUsers] = useState(null);
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: "" });
  const [userCombo, setUserCombo] = useState(null);
  const [estimateRequested, setEstimateRequested] = useState(false);
  const [bookingType, setBookingType] = useState("Book Now");
  const rootRef = useRef(null);
  const [tempRoute, setTempRoute] = useState();
  const [drivers, setDrivers] = useState([]);
  const [selectedLine, setSelectedLine] = useState("");
  const [numberOfBoxes, setNumberOfBoxes] = useState("");

  const { state } = useLocation();

  const [instructionData, setInstructionData] = useState({
    deliveryPerson: "",
    deliveryPersonPhone: "",
    pickUpInstructions: "",
    deliveryInstructions: "",
    parcelTypeIndex: 0,
    optionIndex: 0,
    parcelTypeSelected: null,
    optionSelected: null
  });

  // useEffect(() => {
  //   if(state && state !== null){
  //     let carDetails = state.carData;
  //     setCarType(carDetails.name)
  //     let instObj = {...instructionData};
  //     if(Array.isArray(carDetails.parcelTypes)){
  //       instObj.parcelTypeSelected = carDetails.parcelTypes[0];
  //       instObj.parcelTypeIndex = 0;
  //     }
  //     if(Array.isArray(carDetails.options)){
  //       instObj.optionSelected = carDetails.options[0];
  //       instObj.optionIndex = 0;
  //     }
  //     setInstructionData(instObj);
  //     setSelectedCarDetails(carDetails);
  //   }
  // }, [instructionData, state]);

  const handleChange = e => {
    if (e.target.name === "parcelTypeIndex") {
      setInstructionData({
        ...instructionData,
        parcelTypeIndex: parseInt(e.target.value),
        parcelTypeSelected: selectedCarDetails.parcelTypes[e.target.value]
      });
    } else if (e.target.name === "optionIndex") {
      setInstructionData({
        ...instructionData,
        optionIndex: parseInt(e.target.value),
        optionSelected: selectedCarDetails.options[e.target.value]
      });
    } else {
      setInstructionData({
        ...instructionData,
        [e.target.name]: e.target.value
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState(GetDateString());

  // const handleCarSelect = (event) => {
  //   setCarType(event.target.value);
  //   let carDetails = null;
  //   for (let i = 0; i < cartypes.length; i++) {
  //     if (cartypes[i].name === event.target.value) {
  //       carDetails = cartypes[i];
  //       let instObj = {...instructionData};
  //       if(Array.isArray(cartypes[i].parcelTypes)){
  //         instObj.parcelTypeSelected = cartypes[i].parcelTypes[0];
  //         instObj.parcelTypeIndex = 0;
  //       }
  //       if(Array.isArray(cartypes[i].options)){
  //         instObj.optionSelected = cartypes[i].options[0];
  //         instObj.optionIndex = 0;
  //       }
  //       setInstructionData(instObj);
  //     }
  //   }
  //   setSelectedCarDetails(carDetails);
  // };

  const handleLineSelect = event => {
    setSelectedLine(event.target.value);
  };

  const handleBoxesSelect = event => {
    setNumberOfBoxes(event.target.value);
  };

  const onDateChange = event => {
    setSelectedDate(event.target.value);
  };

  useEffect(
    () => {
      if (estimatedata.estimate && estimateRequested) {
        setEstimateRequested(false);
        setEstimateModalStatus(true);
      }
      if (userdata.users) {
        let arr = [];
        for (let i = 0; i < userdata.users.length; i++) {
          let user = userdata.users[i];
          if (
            user.usertype === "customer" &&
            ((auth.profile.usertype === "fleetadmin" &&
              user.fleetadmin === auth.profile.uid) ||
              auth.profile.usertype === "admin")
          ) {
            arr.push({
              firstName: user.firstName,
              lastName: user.lastName,
              mobile: user.mobile,
              email: user.email,
              uid: user.id,
              desc:
                user.firstName +
                " " +
                user.lastName +
                " (" +
                (settings.AllowCriticalEditsAdmin ? user.mobile : "Hidden") +
                ") " +
                (settings.AllowCriticalEditsAdmin ? user.email : "Hidden"),
              pushToken: user.pushToken
            });
          }
        }
        setUsers(arr);
        let arrDrivers = [];
        for (let i = 0; i < userdata.users.length; i++) {
          let user = userdata.users[i];
          if (
            user.usertype &&
            user.usertype === "driver" &&
            user.approved === true &&
            user.queue === false &&
            user.driverActiveStatus === true &&
            user.location
          ) {
            if (
              (auth.profile.usertype === "fleetadmin" &&
                user.fleetadmin === auth.profile.uid) ||
              auth.profile.usertype === "admin" ||
              auth.profile.usertype === "customer"
            ) {
              arrDrivers.push({
                uid: user.id,
                location: user.location,
                carType: user.carType
              });
            }
          }
        }
        setDrivers(arrDrivers);
      }
    },
    [
      estimatedata.estimate,
      userdata.users,
      estimateRequested,
      settings.AllowCriticalEditsAdmin,
      auth.profile.usertype,
      auth.profile.uid
    ]
  );

  useEffect(
    () => {
      if (auth.profile.usertype && auth.profile.usertype === "customer") {
        setUserCombo({
          firstName: auth.profile.firstName,
          lastName: auth.profile.lastName,
          mobile: auth.profile.mobile,
          email: auth.profile.email,
          uid: auth.profile.uid,
          pushToken: auth.profile.pushToken
        });
      }
    },
    [auth.profile]
  );

  const mobile = userCombo && userCombo.mobile ? true : false;

  const handleGetOptions = e => {
    e.preventDefault();
    setEstimateRequested(true);
    if (
      userCombo &&
      pickupAddress &&
      dropAddress &&
      selectedLine &&
      numberOfBoxes
    ) {
      const directionService = new window.google.maps.DirectionsService();
      directionService.route(
        {
          origin: new window.google.maps.LatLng(
            pickupAddress.coords.lat,
            pickupAddress.coords.lng
          ),
          destination: new window.google.maps.LatLng(
            dropAddress.coords.lat,
            dropAddress.coords.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = {
              distance_in_km: result.routes[0].legs[0].distance.value / 1000,
              time_in_secs: result.routes[0].legs[0].duration.value,
              polylinePoints: result.routes[0].overview_polyline
            };
            setTempRoute(route);

            if (mobile === true) {
              let estimateRequest = {
                pickup: pickupAddress,
                drop: dropAddress,
                instructionData: {
                  ...instructionData,
                  lineName: selectedLine,
                  numberOfBoxes: numberOfBoxes,
                  postionOfBoxes: []
                },
                routeDetails: route
              };
              dispatch(getEstimate(estimateRequest));
            } else {
              setCommonAlert({ open: true, msg: t("incomplete_user") });
            }
          } else {
            setCommonAlert({ open: true, msg: t("place_to_coords_error") });
          }
        }
      );
    } else {
      setCommonAlert({ open: true, msg: t("select_proper") });
    }
  };

  const handleGetEstimate = e => {
    e.preventDefault();
    setOptionModalStatus(false);
    let estimateRequest = {
      pickup: pickupAddress,
      drop: dropAddress,
      carDetails: selectedCarDetails,
      instructionData: instructionData,
      routeDetails: tempRoute
    };
    dispatch(getEstimate(estimateRequest));
  };

  const confirmBooking = e => {
    e.preventDefault();
    let requestedDrivers = {};
    // if (settings.autoDispatch && bookingType === 'Book Now') {
    //   for (let i = 0; i < drivers.length; i++) {
    //     const driver = drivers[i];
    //     let distance = GetDistance(pickupAddress.coords.lat, pickupAddress.coords.lng, driver.location.lat, driver.location.lng);
    //     if (settings.convert_to_mile) {
    //       distance = distance / 1.609344;
    //     }
    //     if (distance < ((settings && settings.driverRadius) ? settings.driverRadius : 10) && selectedCarDetails.name === driver.carType) {
    //       requestedDrivers[driver['uid']] = true;
    //     }
    //   }
    // }

    let bookingObject = {
      pickup: pickupAddress,
      drop: dropAddress,
      carDetails: selectedCarDetails,
      userDetails: {
        uid: userCombo.uid,
        firstName: userCombo.firstName,
        lastName: userCombo.lastName,
        mobile: userCombo.mobile,
        pushToken: userCombo.pushToken,
        email: userCombo.email
      },
      estimate: estimatedata.estimate,
      instructionData: instructionData,
      tripdate:
        bookingType === "Book Later"
          ? new Date(selectedDate).getTime()
          : new Date().getTime(),
      bookLater: bookingType === "Book Later" ? true : false,
      settings: settings,
      booking_type_admin: true,
      fleetadmin:
        auth.profile.usertype === "fleetadmin" ? auth.profile.uid : null,
      requestedDrivers: requestedDrivers
    };

    const result = validateBookingObj(t, bookingObject, instructionData);
    if (result.error) {
      setCommonAlert({ open: true, msg: result.msg });
    } else {
      setEstimateModalStatus(false);
      dispatch(addBooking(result.bookingObject));
    }
  };

  const handleOptionModalClose = e => {
    e.preventDefault();
    setOptionModalStatus(false);
  };

  const handleEstimateModalClose = e => {
    e.preventDefault();
    setEstimateModalStatus(false);
    dispatch(clearEstimate());
    setEstimateRequested(false);
  };

  const handleEstimateErrorClose = e => {
    e.preventDefault();
    dispatch(clearEstimate());
    setEstimateRequested(false);
  };

  const handleBookingAlertClose = e => {
    e.preventDefault();
    dispatch(clearBooking());
    dispatch(clearEstimate());
    clearForm();
  };

  const clearForm = () => {
    setUserCombo(null);
    setPickupAddress(null);
    setDropAddress(null);
    setSelectedCarDetails(null);
    setCarType(t("select_car"));
    setBookingType("Book Now");
    setEstimateRequested(false);
    setSelectedLine("");
    setNumberOfBoxes("");
  };

  const handleBookingErrorClose = e => {
    e.preventDefault();
    dispatch(clearBooking());
    setEstimateRequested(false);
  };

  const handleCommonAlertClose = e => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: "" });
  };

  return (
    <div className={classes.container} ref={rootRef}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.title}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            {t("addbookinglable")}
          </Typography>
        </Grid>
        <div className={classes.container1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {users &&
              auth.profile.usertype &&
              auth.profile.usertype !== "customer"
                ? <UsersCombo
                    className={classes.items}
                    placeholder={t("select_user")}
                    users={users}
                    value={userCombo}
                    onChange={(event, newValue) => {
                      setUserCombo(newValue);
                    }}
                  />
                : null}
            </Grid>
            <Grid item xs={12}>
              <GoogleMapsAutoComplete
                variant={"outlined"}
                placeholder={t("pickup_location")}
                value={pickupAddress}
                className={classes.items}
                onChange={value => {
                  setPickupAddress(value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <GoogleMapsAutoComplete
                placeholder={t("drop_location")}
                variant={"outlined"}
                value={dropAddress}
                className={classes.items}
                onChange={value => {
                  setDropAddress(value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="select-line-label">Select Line</InputLabel>
                <Select
                  id="booking-type-native"
                  labelId="select-line-label"
                  label={"Select Line"}
                  value={selectedLine}
                  onChange={handleLineSelect}
                  className={classes.input}
                  style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {menuLinesList.map(line => {
                    return (
                      <MenuItem
                        dense
                        key={line.name}
                        value={line.name}
                        style={{
                          direction: isRTL === "rtl" ? "rtl" : "ltr",
                          width: "100%",
                          justifyContent: "flex-start",
                          paddingLeft: 10
                        }}
                      >
                        {line.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="select-box-label">Number Of Boxes</InputLabel>
                <Select
                  id="booking-type-native"
                  labelId="select-box-label"
                  label={"Number Of Boxes"}
                  value={numberOfBoxes}
                  onChange={handleBoxesSelect}
                  className={classes.input}
                  style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {menuBoxesList.map(box => {
                    return (
                      <MenuItem
                        dense
                        key={box.numberOfBoxes}
                        value={box.numberOfBoxes}
                        style={{
                          direction: isRTL === "rtl" ? "rtl" : "ltr",
                          width: "100%",
                          justifyContent: "flex-start",
                          paddingLeft: 10
                        }}
                      >
                        {box.numberOfBoxes}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                size="lg"
                onClick={handleGetOptions}
                variant="contained"
                color="secondaryButton"
                className={classes.buttonStyle}
              >
                <i
                  className="fas fa-car"
                  style={
                    isRTL === "rtl" ? { marginLeft: 5 } : { marginRight: 5 }
                  }
                />
                {t("book")}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={optionModalStatus}
        onClose={handleOptionModalClose}
        className={classes.modal}
        container={() => rootRef.current}
      >
        <Grid container spacing={2} className={classes.paper}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            {selectedCarDetails && selectedCarDetails.parcelTypes
              ? <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {t("parcel_types")}
                  </FormLabel>
                  <RadioGroup
                    name="parcelTypeIndex"
                    value={instructionData.parcelTypeIndex}
                    onChange={handleChange}
                  >
                    {selectedCarDetails.parcelTypes.map((element, index) =>
                      <FormControlLabel
                        key={element.description}
                        value={index}
                        control={<Radio />}
                        label={
                          settings.swipe_symbol === false
                            ? settings.symbol +
                              " " +
                              element.amount +
                              " - " +
                              element.description
                            : element.amount +
                              " " +
                              settings.symbol +
                              " - " +
                              element.description
                        }
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              : null}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            {selectedCarDetails && selectedCarDetails.options
              ? <FormControl component="fieldset">
                  <FormLabel component="legend">
                    {t("options")}
                  </FormLabel>
                  <RadioGroup
                    name="optionIndex"
                    value={instructionData.optionIndex}
                    onChange={handleChange}
                  >
                    {selectedCarDetails.options.map((element, index) =>
                      <FormControlLabel
                        key={element.description}
                        value={index}
                        control={<Radio />}
                        label={
                          settings.swipe_symbol === false
                            ? settings.symbol +
                              " " +
                              element.amount +
                              " - " +
                              element.description
                            : element.amount +
                              " " +
                              settings.symbol +
                              " - " +
                              element.description
                        }
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              : null}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            <Button
              onClick={handleOptionModalClose}
              variant="contained"
              color="primary"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handleGetEstimate}
              variant="contained"
              color="primary"
              style={isRTL === "rtl" ? { marginRight: 10 } : { marginLeft: 10 }}
            >
              {t("get_estimate")}
            </Button>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={estimateModalStatus}
        onClose={handleEstimateModalClose}
        className={classes.modal}
        container={() => rootRef.current}
      >
        <Grid container spacing={1} className={classes.paper}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            {settings.swipe_symbol === false
              ? <Typography
                  color={colors.Header}
                  style={{ alignSelf: "center", fontSize: 40 }}
                >
                  {settings ? settings.symbol : null}{" "}
                  {estimatedata.estimate
                    ? estimatedata.estimate.estimateFare
                    : null}
                </Typography>
              : <Typography
                  color={colors.Header}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 40
                  }}
                >
                  {estimatedata.estimate
                    ? estimatedata.estimate.estimateFare
                    : null}{" "}
                  {settings ? settings.symbol : null}
                </Typography>}
          </Grid>
          <BookingModalBody
            classes={classes}
            instructionData={instructionData}
            handleChange={handleChange}
          />

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            <Button onClick={handleEstimateModalClose} variant="contained">
              {t("cancel")}
            </Button>
            <Button
              onClick={confirmBooking}
              variant="contained"
              style={
                isRTL === "rtl"
                  ? { backgroundColor: colors.Header, marginRight: 10 }
                  : { backgroundColor: colors.Header, marginLeft: 10 }
              }
            >
              {t("book_now")}
            </Button>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={bookingdata.booking ? true : false}
        onClose={handleBookingAlertClose}
        className={classes.modal}
      >
        <Grid container spacing={1} className={classes.paper}>
          <BookingDetails bookingData={bookingdata.booking} />
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              marginTop: "20px"
            }}
          >
            <Button
              style={{ backgroundColor: colors.Header }}
              onClick={handleBookingAlertClose}
              variant="contained"
            >
              {t("cancel")}
            </Button>
          </Grid>
        </Grid>
      </Modal>
      {/* <AlertDialog open={bookingdata.booking ? true : false} onClose={handleBookingAlertClose}>{bookingdata.booking ? t('booking_success') + bookingdata.booking.booking_id : null}</AlertDialog> */}
      <AlertDialog
        open={bookingdata.error.flag}
        onClose={handleBookingErrorClose}
      >
        {bookingdata.error.msg}
      </AlertDialog>
      <AlertDialog
        open={estimatedata.error.flag}
        onClose={handleEstimateErrorClose}
      >
        {estimatedata.error.msg}
      </AlertDialog>
      <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>
        {commonAlert.msg}
      </AlertDialog>
    </div>
  );
}
