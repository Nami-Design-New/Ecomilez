import React, { useState, useEffect} from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import useStyles from '../styles/styles';
import { useTranslation } from "react-i18next";
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import CarCrashOutlinedIcon from '@mui/icons-material/CarCrashOutlined';
import backImage from '../assets/img/back.png';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { checkCat } from '../common/sharedFunctions';

const Section = (props) => {
  const settings = useSelector(state => state.settingsdata.settings);
  const classes = useStyles();
  const { t } = useTranslation();
  const cartypes = useSelector(state => state.cartypes);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (cartypes.cars) {
      setData(cartypes.cars);
    } else {
      setData([]);
    }
  }, [cartypes.cars]);

  const navigate = useNavigate();
  const role = props.role;
  
  const sectionItems = [
    {
      id: 1,
      icon:  <EmojiTransportationIcon style={{ color: 'gold', fontSize: '30px', marginRight: 5 }} />,
      sentence1:t('pruduct_section_heading_1'),
      sentence: t('product_section_1'),
    },
    {
      id: 2,
      icon:  <AccessTimeIcon style={{ color: 'gold', fontSize: '30px', marginRight: 8 }} />,
      sentence1:t('pruduct_section_heading_2'),
      sentence: t('product_section_2'),
    },
  ];
  const sectionItems1 = [
    {
      id: 1,
      icon:   <CarCrashOutlinedIcon style={{ color: 'gold', fontSize: '30px', marginRight: 8 }} />,
      sentence1:t('pruduct_section_heading_3'),
      sentence: t('product_section_3'),
    },
    {
      id: 2,
      icon:  <VerifiedIcon style={{ color: 'gold', fontSize: '30px', marginRight: 8 }} />,
      sentence1:t('pruduct_section_heading_4'),
      sentence: t('product_section_4'),
    },
  ];
  return (
    <div>
      <Box sx={{ flexGrow: 1, minHeight: '480px',marginTop:5,marginBottom:1}}>
        <Grid container className={classes.sectionGridContainer}>
          {data && data.map((item, key) => {
            return (
              <div style={{marginBottom: 55}} key={key}>
                <Box
                  xs={12}
                  md={3.5}
                  height={300}
                  minHeight={300}
                  width={300}
                  minWidth={275}
                  className={classes.sectionGridItem}
                  boxShadow={3}
                  style={{ backgroundColor: key%2 ===0 ? '#DEDFD5' :'#f5bf19', textAlign:'center'}}
                >
                  <img alt='Car' src={item.image} style={{ width: 150, height: 80 }} />
                  <Typography style={{ margin: 11, color: 'black', fontSize: 20 }}>{item.name}</Typography>
                  <Box style={{ backgroundColor: 'white', height: 215, borderRadius: 25, padding: 10}} boxShadow={3}>
                    {settings.swipe_symbol === false ?
                    <Typography style={{ marginTop: 8,fontWeight:'bold',fontSize:25 }}>{settings.symbol}{item.rate_per_unit_distance}/{settings.convert_to_mile ? t('mile') : t('km')}</Typography>
                    :
                    <Typography style={{ marginTop: 8,fontWeight:'bold',fontSize:25 }}>{item.rate_per_unit_distance}{settings.symbol}/{settings.convert_to_mile ? t('mile') : t('km')}</Typography>
                    }
                    <Typography style={{ marginTop: 5 }}>{t('min_fare')}:{item.min_fare}</Typography>
                    <Typography style={{ marginTop: 5 }}>{t('extra_info')}:{item.extra_info}</Typography>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ width: '150px', fontSize: '16px', marginTop: 3 }}
                      onClick={(e) => { e.preventDefault(); navigate( checkCat(3) ? '/bookings' : (role && role === 'driver') ? '/bookings' : '/addbookings', { state: { carData: item }} )}}
                    >
                      {checkCat(3) ? t('info') :  t('book_now')}
                    </Button>
                  </Box>
                </Box>
              </div>
              
            )
          })}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: '350px', backgroundImage: `url(${backImage})`, backgroundSize: 'cover'}}>
        <Typography variant="h3" fontWeight={400} style={{ color: 'gold', textAlign: 'center', padding: 35}}>BEST SERVICE PROVIDED</Typography>
        <Grid container className={classes.sectionGridContainer}>
          {sectionItems.map((item, key) => {
            return (
              <Box
                key={key}
                xs={12}
                md={3.5}
                //height={300}
                minHeight={150}
                className={classes.sectionGridItem1}
              >
                <div style={{display:'flex'}}>
                  {item.icon}
                  <div>
                    <Typography variant="h5" style={{ color: 'gold', fontWeight: 'bold'}}>{item.sentence1}</Typography>
                    <Typography style={{ color: 'white'}} className={classes.aboutUsSubtitle}>{item.sentence}</Typography>
                  </div>
                </div> 
              </Box>
            )
          })}
        </Grid>

        <Grid container className={classes.sectionGridContainer}>
          {sectionItems1.map((item, key) => {
            return (
              <Box
                key={key}
                xs={12}
                md={3.5}
                //height={300}
                minHeight={150}
                
                className={classes.sectionGridItem1}
              >
                <div style={{display:'flex'}}>
                  {item.icon}
                  <div>
                    <Typography variant="h5" style={{ color: 'gold', fontWeight: 'bold' }}>{item.sentence1}</Typography>
                    <Typography style={{ color: 'white'}} className={classes.aboutUsSubtitle}>{item.sentence}</Typography>
                  </div>
                </div> 
              </Box>
            )
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Section;