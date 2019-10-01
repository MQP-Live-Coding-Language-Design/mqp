import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tutorial from '../tutorial/Tutorial';
import Playground from '../playground/Playground';
import UTInstructions from './UTInstructions';
import UserDocumentation from '../documentation/UserDocumentation';


function TabPanel(props) {
  const {
    children, value, index,
  } = props;

  return (
    <Typography
      hidden={value !== index}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const UTNavigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tutorial" />
          <Tab label="Instructions" />
          <Tab label="Get Creative" />
          <Tab label="Documentation" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Tutorial id="tutorial" value={value} index={0} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UTInstructions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Playground />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserDocumentation />
      </TabPanel>
    </div>
  );
};

export default UTNavigation;
