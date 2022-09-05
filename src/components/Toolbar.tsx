import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';

const ToolbarWrapper = (props: {
  onSwitchChange: any
}) => {
  const switchLabel = "Click to start/stop auto refresh";
  const [switchState, setSwitchState] = useState<boolean>(false);
  const swithStateChanged = () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);
    props.onSwitchChange(newSwitchState);
  }
  return (
    <Toolbar sx={{bgcolor: "white", justifyContent: "space-between" }} variant="dense">
        <img
          src={require("../assets/app-bar-logo.png")}
          alt="Logo"
          width="80"
        />
        <Typography variant="h6" color="black" component="div">
          Amsterdam
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControlLabel control={<Switch checked={switchState} onChange={swithStateChanged} />} label={switchLabel} sx={{color: "black"}} />
          {
            switchState ? <CircularProgress size="2rem" /> : <CircularProgress variant="determinate" value={100} sx={{color: "gray"}} size="2rem" />
          }
        </Box>
      </Toolbar>
  )
}

export default ToolbarWrapper;