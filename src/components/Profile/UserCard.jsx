import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/users/${user.username}`}>
        <CardMedia
          sx={{ height: 260, filter: "brightness(95%)" }}
          component="img"
          height="100"
          image={user.imageUrl}
          alt={user.username}
        />
        <CardContent>
          <Typography gutterBottom variant="button" component="div">
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.followers.length} Followers
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserCard;
