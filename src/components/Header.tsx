import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  headerLink: {
    color: 'white',
    margin: '0 0 0 30px',
    fontSize: '18px'
  }
});

function Header() {
  const headerLinks = [
    {
      label: 'USERS',
      href: '/'
    },
    {
      label: 'NEW USER',
      href: '/NewUser'
    }
  ];

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Box display="flex" flexGrow={1} alignItems="center">
            <Typography variant="h6" noWrap>
              USER MANAGER
            </Typography>
            {headerLinks.map(({ label, href }) => (
              <Button variant="text" key={label} component={Link} to={href} replace className={classes.headerLink}>
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
