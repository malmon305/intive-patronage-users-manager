import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

// https://github.com/mui-org/material-ui/issues/27149
const useStyles = makeStyles({
  headerLink: {
    color: 'white!important',
    margin: '3px 15px 0 0!important',
    fontSize: '18px!important'
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
      href: '/new'
    }
  ];

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box display="flex" flexGrow={1} alignItems="center">
            <Typography variant="h6" noWrap>
              USERS MANAGER
            </Typography>
            <Box ml="50px">
              {headerLinks.map(({ label, href }) => (
                <Button key={label} color="warning" component={Link} to={href} replace className={classes.headerLink}>
                  {label}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
