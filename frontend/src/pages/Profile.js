import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
  },
  bio: {
    marginTop: 20,
  },
});

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/users/${id}`);
      setUser(data);
    };
    fetchUser();
  }, [id]);

  // console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Avatar src={user.image} sx={{ width: 75, height: 75 }} style={{ alignItems: "center", display: "flex", margin: "auto" }}/>
        <Typography className={classes.title} variant="h4" component="h2">{user.username}</Typography>
        <Typography color="textSecondary">{user.email}</Typography>
        <Typography className={classes.bio} variant="body2" component="p">{user.bio}</Typography>
      </CardContent>
    </Card>
  );
};

export default Profile;