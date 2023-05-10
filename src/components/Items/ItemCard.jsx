import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ItemCard = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={item.imageUrl}
        title={item.name}
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
      <CardActions>
        <Link to={`/my-items/${item._id}`} className="m-2">
          <Button size="small">View</Button>
        </Link>
        <Link to="#" className="m-2">
          <Button size="small">Share</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
