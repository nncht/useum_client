import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { CardActionArea } from "@mui/material";

const CollectionCard = ({ collection }) => {
  // Necessary to determine whether the current view is Home or User Profile
  const { username } = useParams();

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Clicking anywhere on the card opens Collection Detail page */}
      <CardActionArea href={`/collections/${collection._id}`}>
        {/* Collection header image */}
        <CardMedia
          sx={{ height: 200, filter: "brightness(95%)" }}
          image={
            collection.imageUrl === ""
              ? "/images/default/default-collection.svg"
              : collection.imageUrl
          }
          title={collection.name}
        />
        {/* If card is on home view, show collection owner's profile picture */}
        {username === collection.createdBy.username ? (
          <CardHeader
            sx={{ height: "80px" }}
            avatar={<Avatar aria-label="collection">R</Avatar>}
            title={collection.name}
            subheader={
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: "1.2em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {collection.description}
              </Typography>
            }
          />
        ) : (
          // Else, the currentUser is viewing the owner's profile and the additional profile picture display is redundant
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                minHeight: "2.4rem",
                maxHeight: "2.4rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {collection.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                minHeight: "2.4rem",
                maxHeight: "2.4rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {collection.description}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
