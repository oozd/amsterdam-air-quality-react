import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Info = (props: {
  station: any
}) => {
  const { station } = props;
  return (
    <Card sx={{ width: 290 }}>
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                {station.city.name}
            </Typography>
            <Divider style={{width:'100%'}} />
            <Typography sx={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                Average: {props.station.forecast.daily.pm25[2].avg}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                Min: {props.station.forecast.daily.pm25[2].min}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "gray", fontWeight: "500" }}>
                Max: {props.station.forecast.daily.pm25[2].max}
            </Typography>
            <Divider style={{width:'100%'}} />
          
        </Box>
      </CardContent>
        
    </Card>
  )
}

export default Info;