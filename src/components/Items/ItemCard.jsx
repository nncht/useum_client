import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { setCollectionId } from "../../services/sharedDatastore";
import getCollection from "../../services/getCollection";

const ItemCard = ({ item, currentCollection }) => {
  const [collection, setCollection] = useState(null);

  const collectionId = currentCollection;

  useEffect(() => {
    getCollection(collectionId, setCollection);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/items/${item._id}`}>
        <CardMedia
          sx={{ height: 200 }}
          image={
            item.imageUrl === "" || item.imageUrl === "No image"
              ? "/images/default/default-item.svg"
              : item.imageUrl
          }
          title={item.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="button"
            component="div"
            sx={{
              lineHeight: "2em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
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
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
