import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(10, 2, 0),

  },
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  const { name, native, emoji, currency, languages } = props;
  const getLanguages = () => languages
    .map(language => language.name)
    .join(', ');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          <strong>Selected Country:</strong>
        </Typography>
        <Typography component="p">
          <strong>Name: </strong>{name} ({native}) {emoji} | <strong>Currency: </strong>{currency} |
          <strong> Language(s): </strong>{getLanguages()}
        </Typography>
      </Paper>
    </div>
  );
}