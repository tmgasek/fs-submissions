import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: 10,
  },
  field: {
    marginTop: 10,
    marginBottom: 10,
    display: 'block',
  },
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  lastItem: {
    flexGrow: 1,
  },
  heading: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: '#f9f9f9',
  },
  logOutBtn: {
    marginLeft: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));
