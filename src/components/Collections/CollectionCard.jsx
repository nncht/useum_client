import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../context/userData.context";
import { AuthContext } from "../../context/auth.context";
import API_URL from "../../services/apiConfig";

// MUI components
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// --- End of imports

const CollectionCard = ({ collection }) => {
  // Necessary to determine whether the current view is Home or User Profile
  const { username } = useParams();
  // Necessary to get the profile pictures for the Avatar component
  const [ownerData, setOwnerData] = useState(null);

  // Fetch ownerData user object
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_URL}/collections/${collection._id}`
      );
      setOwnerData(response.data);
    };

    if (ownerData === null) {
      fetchData();
    }
  }, []);

  console.log(ownerData);

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
            sx={{ height: "85px" }}
            avatar={
              <Avatar
                aria-label="Profile picture"
                alt={collection.createdBy.username}
                src={ownerData?.createdBy?.imageUrl}
              />
            }
            title={
              <Typography
                variant="button"
                color="text.secondary"
                sx={{
                  lineHeight: "2em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {collection.name}
              </Typography>
            }
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
