import React, { useState, useEffect, useRef, useContext } from 'react';
import CircularLoading from "../components/CircularLoading";
import { useSelector, useDispatch } from "react-redux";
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import AlertDialog from '../components/AlertDialog';
import { FirebaseContext, api } from 'common';
import { useTranslation } from "react-i18next";
import moment from 'moment/min/moment-with-locales';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Select,
  MenuItem
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import {colors} from '../components/Theme/WebTheme';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 192,
    height: 192
  },
  container: {
    zIndex: "12",
    backgroundColor: colors.Header,
    alignContent: 'center',
    borderRadius: "19px",
    padding:'20px',
    width: '70%',
  },
  container1: {
    backgroundColor: colors.Header_Text,
    borderRadius: "19px",
    padding:'30px',
    width: '100%',
    top: "19px",
  },
  title: {
    color: colors.Header_Text,
    marginBottom: '15px',
    textAlign: 'center', 
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    backgroundColor: colors.Header,
    alignContent: 'center',
    borderRadius: "19px",
    padding:'20px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rootRtl: {
    "& label": {
      right: 10,
      left: "auto",
      paddingRight: 20
    },
    "& legend": {
      textAlign: "right",
      marginRight: 20
    }
  },
  rootRtl_1: {
    "& label": {
      right: 10,
      left: "auto",
      paddingRight: 33
    },
    "& legend": {
      textAlign: "right",
      marginRight: 25
    }
  },
  submit2: {
    marginLeft:75,
    top:-40,
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#019b9d'
  },
  icon: {
    backgroundColor: 'red',
    width: 30,
    height: 30
  },
  buttonStyle: {
    margin: 0,
    width: '100%',
    height: 40,
    borderRadius: "30px",
    backgroundColor: colors.Header,
    marginTop:'15px',
    color:'#FFF'
  }
}));

const MyProfile = () => {
  const { authRef, RecaptchaVerifier } = useContext(FirebaseContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const {
    updateProfile,
    updateWebProfileImage,
    requestEmailOtp,
    updateAuthEmail
  } = api;
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: '' });
  const languagedata = useSelector(state => state.languagedata);
  const [langSelection, setLangSelection] = useState(0);
  const [multiLanguage,setMultiLanguage] = useState();
  const fileInputRef=useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    usertype: ''
  });

  const [otp,setOtp] = useState("");
  const [otpCalled,setOtpCalled] = useState(false);
  const [updateCalled,setUpdateCalled] = useState(false);
  const [confirmCodeFunction,setConfirmCodeFunction] = useState();
 
  useEffect(()=>{
    if(languagedata.langlist){
      let arr = Object.keys(languagedata.langlist);
      for (let i=0; i< arr.length; i++) {
        if(auth.profile && auth.profile.lang && auth.profile.lang.langLocale && auth.profile.lang.langLocale === languagedata.langlist[arr[i]].langLocale){
          setLangSelection(i);
        }
      }
      setMultiLanguage(languagedata.langlist);
    }
  },[languagedata.langlist,auth.profile,setMultiLanguage,setLangSelection]);

  useEffect(() => {
    if (auth.profile && auth.profile.uid) {
      setData({
        firstName: auth.profile.firstName,
        lastName: auth.profile.lastName,
        email: auth.profile.email,
        mobile: auth.profile.mobile,
        usertype: auth.profile.usertype,
        profile_image: auth.profile.profile_image ?  auth.profile.profile_image : ''
      });
      if(updateCalled){
        setLoading(false);
        setCommonAlert({ open: true, msg: t('profile_updated') });
        setUpdateCalled(false);
      }
    }

  }, [auth.profile, t, updateCalled]);

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const completeSubmit = () => {
    setUpdateCalled(true);
    let arr = Object.keys(languagedata.langlist);
    dispatch(updateProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      lang: {langLocale: multiLanguage[arr[langSelection]].langLocale, dateLocale:multiLanguage[arr[langSelection]].dateLocale }
    }));

    if(selectedImage){
      updateWebProfileImage(selectedImage);
    }

    const lang = multiLanguage[arr[langSelection]];
    i18n.addResourceBundle(multiLanguage[arr[langSelection]].langLocale, 'translations', multiLanguage[arr[langSelection]].keyValuePairs);
    i18n.changeLanguage(lang.langLocale);
    moment.locale(lang.dateLocale);
    setSelectedImage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.email!==auth.profile.email && data.mobile!==auth.profile.mobile){
      setCommonAlert({ open: true, msg: t('update_any') })
    } else {
      if( data.firstName && data.firstName.length > 0 && data.lastName && data.lastName.length > 0){
        if(data.email!==auth.profile.email ){
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if(re.test(data.email)){
            setOtpCalled(true);
            dispatch(requestEmailOtp(data.email));
          } else {
            setCommonAlert({ open: true, msg: t('proper_email') })
          }
        } else if(data.mobile!==auth.profile.mobile ){
          if(data.mobile && data.mobile.length > 6){
            setOtpCalled(true);
            window.recaptchaVerifier = new RecaptchaVerifier("sign-in-button",{
              'size': 'invisible'
            });
            if(auth.profile.mobile && auth.profile.mobile.length>6){
              await authRef.currentUser.unlink("phone")
            }
            const linkObj = await authRef.currentUser.linkWithPhoneNumber(data.mobile, window.recaptchaVerifier);
            setConfirmCodeFunction(linkObj);
          } else {
            setCommonAlert({ open: true, msg: t('mobile_no_blank_error') })
          }
        } else{
          setLoading(true);
          completeSubmit();
        }
      } else{
        setCommonAlert({ open: true, msg: t('no_details_error') })
      }
    }
  }

  const updateOtp = (e) => {
    setOtp(e.target.value);
  }

  const handleVerify = async () => {
    if(otp && otp.length === 6 && !isNaN(otp)){
      setLoading(true);
      if(confirmCodeFunction){
        confirmCodeFunction.confirm(otp).then((user)=>{
            completeSubmit()
        }).catch((error)=>{
            setOtp('');
            setLoading(false);
            window.recaptchaVerifier.clear();
            setCommonAlert({ open: true, msg: t('otp_validate_error')})
        })
      }else{
        const res = await updateAuthEmail(data.email,otp);
        if(res.success){
          completeSubmit()
        }else{
          setOtp('');
          setLoading(false);
          if(res.error === 'Error updating user'){
              setCommonAlert({ open: true, msg: t('user_exists')})
          }else{
              setCommonAlert({ open: true, msg: t('otp_validate_error')})
          }
        }
      }
    } else{
      setOtp('');
      setCommonAlert({ open: true, msg: t('otp_validate_error')})
    }
    setOtpCalled(false);
    window.recaptchaVerifier = null;
  }

  const handleClose = () => {
    setOtp('');
    setOtpCalled(false);
    window.recaptchaVerifier = null;
  }

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: '' })
  };

  const handleLanguageSelect = (event) => {
    setLangSelection(event.target.value);
  };

  const profileImageChange = async (e)=>{
    setSelectedImage( e.target.files[0]);
  }
  return (
    auth.loading ? <CircularLoading /> :
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div id="sign-in-button" />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit} style={{ direction: isRTL === 'rtl' ? 'rtl' : 'ltr' }}>
            <Typography component="h1" variant="h5" className={classes.title}>
              {t('profile')}
            </Typography>

            <div className={classes.container1}>
            <CardContent className={classes.img}>
              {selectedImage ?
                   <div  onClick={()=>fileInputRef.current.click()} style={{display:'flex',justifyContent:'center'}}>
                <img src = {URL.createObjectURL(selectedImage)} alt='Profile'
                style={{width:130, height:130, borderRadius: 65}}/>
           </div>
                :
                data.profile_image ?
                <div  onClick={()=>fileInputRef.current.click()} style={{display:'flex',justifyContent:'center'}}>
                  <img src = {data.profile_image} alt='Profile'
                  style={{width:130, height:130, borderRadius: 65}}/>
                       </div>
                :
                <div  onClick={()=>fileInputRef.current.click()} style={{display:'flex',justifyContent:'center'}}>
                  <img src = {require("../assets/img/profilePic.png").default} alt='Profile'
                  style={{width:130, height:130, borderRadius: 65}}/>
                  </div>
              } 
              <input onChange={(event)=>profileImageChange(event)} multiple={false} ref={fileInputRef} type='file' hidden/>
            </CardContent> 

            <TextField
              className={isRTL === "rtl" ? classes.rootRtl : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={t('firstname')}
              name="firstName"
              autoComplete="firstName"
              onChange={updateData}
              value={data.firstName}
              autoFocus
            />
            <TextField
              className={isRTL === "rtl" ? classes.rootRtl_1 : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={t('lastname')}
              name="lastName"
              autoComplete="lastName"
              onChange={updateData}
              value={data.lastName}
            />
            <TextField
              className={isRTL === "rtl" ? classes.rootRtl : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('email')}
              name="email"
              autoComplete="email"
              onChange={updateData}
              value={data.email}
            />
            <TextField
              className={isRTL === "rtl" ? classes.rootRtl : null}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobile"
              label={t('phone')}
              name="mobile"
              autoComplete="mobile"
              onChange={updateData}
              value={data.mobile}
            />
            <TextField
              className={isRTL === "rtl" ? classes.rootRtl : null}
              variant="outlined"
              margin="normal"
              fullWidth
              id="usertype"
              label={t('usertype')}
              name="usertype"
              value={data.usertype}
              disabled={true}
            />
            {multiLanguage ?
              <Select
                id="language-select"
                className={classes.input}
                value={langSelection}
                variant="outlined"
                onChange={handleLanguageSelect}
                style={{ backgroundColor: '#fff', width: '100%', marginTop: '16px', }}
              >
                {
                  Object.keys(multiLanguage).map((key,index) => <MenuItem key={key} value={index}>
                    {multiLanguage[key].langName}
                  </MenuItem>)
                }
              </Select>
              : null}
              {loading ?
                <Grid
                  container
                  spacing={0}
                  alignItems="center"
                  justify="center"
                  style={{ minHeight: '3vh', paddingTop: 20}} >
                  <CircularProgress/>
                </Grid>
              :
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  color="secondaryButton"
                  className={classes.buttonStyle}
                >
                  {t('submit')}
                </Button>
              }
              </div>
          </form>
        </div>
        <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>{commonAlert.msg}</AlertDialog>
        <Dialog open={otpCalled} onClose={handleClose}>
          <DialogTitle>{t('otp_here')}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={t('otp')}
              type="numeric"
              fullWidth
              variant="standard"
              onChange={updateOtp}
              value={otp}
            />
          </DialogContent>
          {loading?
            <DialogActions style={{justifyContent:'center', alignContent:'center'}}>
              <CircularProgress/>
            </DialogActions>
            :
            <DialogActions>
              <Button onClick={handleClose}>{t('cancel')}</Button>
              <Button onClick={handleVerify}>{t('verify_otp')}</Button>
            </DialogActions>
          }
        </Dialog>
      </Container>
  );
};

export default MyProfile;