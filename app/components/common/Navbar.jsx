import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import OAuth from '../googleoauth/OAuth';

const Navbar = () => (
  <>
    <Link to="/">
      <Button variant="outlined" type="button">
      Home
      </Button>
    </Link>
    <Link to="/playground">
      <Button variant="outlined" type="button">
        Playground
      </Button>
    </Link>
    <Link to="/tutorial">
      <Button variant="outlined" type="button">
        Tutorial
      </Button>
    </Link>
    <Link to="/documentation">
      <Button variant="outlined" type="button">
        Documentation
      </Button>
    </Link>
    <Link to="/exercises">
      <Button variant="outlined" type="button">
        Exercises
      </Button>
    </Link>
    <OAuth />
  </>
);

export default Navbar;
