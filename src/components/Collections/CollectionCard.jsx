import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const CollectionCard = ({ collection }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/collections/${collection._id}`}>
        <CardMedia
          sx={{ height: 200, filter: "brightness(90%)" }}
          image={
            collection.imageUrl === ""
              ? "/images/default/default-collection.svg"
              : collection.imageUrl
          }
          title={collection.name}
        />
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
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
