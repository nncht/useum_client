import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CollectionCard = ({ collection }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, filter: "brightness(90%) saturate(70%)" }}
        image={
          collection.imageUrl === "" || collection.imageUrl === "No image"
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
      <CardActions>
        <Link to={`/my-collections/${collection._id}`} className="m-2">
          <Button size="small">View</Button>
        </Link>
        <Link to="#" className="m-2">
          <Button size="small">Save</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CollectionCard;
