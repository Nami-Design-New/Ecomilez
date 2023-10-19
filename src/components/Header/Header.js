import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/icons-material/Menu";
import styles from "../../styles/headerStyle.js";
import { useTranslation } from "react-i18next";
import { Box, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
const useStyles = makeStyles(styles);

export default function Header(props) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir();
  const languagedata = useSelector(state => state.languagedata);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [langSelection, setLangSelection] = useState();
  const [multiLanguage, setMultiLanguage] = useState();
  const handleLanguageSelect = event => {
    i18n.changeLanguage(multiLanguage[event.target.value].langLocale);
    setLangSelection(event.target.value);
    moment.locale(multiLanguage[event.target.value].dateLocale);
  };
  useEffect(
    () => {
      if (languagedata.langlist) {
        for (const key of Object.keys(languagedata.langlist)) {
          if (languagedata.langlist[key].default) {
            setLangSelection(key);
          }
        }
        setMultiLanguage(languagedata.langlist);
      }
    },
    [languagedata.langlist]
  );
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const brandComponent = (
    <Button href="/" className={classes.title}>
      <img
        src={require("../../assets/img/ecomilez.svg").default}
        alt="blackLogo"
        className="logo-img"
      />
    </Button>
  );
  return (
    <AppBar className={appBarClasses}>
      <Toolbar
        className={classes.container}
        style={{ direction: isRTL === "rtl" ? "rtl" : "ltr" }}
      >
        {leftLinks !== undefined ? brandComponent : null}
        <div className={isRTL === "rtl" ? null : classes.flex}>
          {leftLinks !== undefined
            ? <Box
                component="div"
                sx={{ display: { sm: "none", md: "block" } }}
              >
                {leftLinks}
              </Box>
            : brandComponent}
        </div>
        <div style={{ direction: isRTL === "rtl" ? "rtl" : "ltr" }}>
          <Box
            component="div"
            sx={{ display: { sm: "none", md: "block", xs: "none" } }}
          >
            {rightLinks}
          </Box>
        </div>
        <Box component="div" sx={{ display: { md: "none", xs: "block" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className="toogler"
          >
          {/*  
          {multiLanguage
              ? <Select
                  id="booking-type-native1"
                  className={classes.input}
                  value={langSelection}
                  onChange={handleLanguageSelect}
                  style={{
                    backgroundColor: "#fff",
                    paddingLeft: "5px",
                    borderRadius: "5px",
                    height: "35px",
                    marginTop: "4px"
                  }}
                >
                  {Object.keys(multiLanguage).map(key =>
                    <MenuItem key={key} value={key}>
                      {multiLanguage[key].langName}
                    </MenuItem>
                  )}
                </Select>
              : null}
              */}
            <Menu />
          </IconButton>
        </Box>
      </Toolbar>
      <Box component="div" sx={{ display: { md: "none", xs: "block" } }}>
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Box>
    </AppBar>
  );
}
Header.defaultProp = {
  color: "white"
};
Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
      "header"
    ]).isRequired
  })
};
