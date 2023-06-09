import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";
import { Box, Link, Typography, Button } from "@mui/material/";

const CategoryTags = () => {
  const { userData } = useContext(UserDataContext);

  if (userData && userData.categories) {
    return (
      <>
        {userData.categories.map((category) => {
          return (
            <>
              <div
                className="bg-slate-500 text-white inline-block text-xs px-2 py-1 m-2 rounded "
                style={{ whiteSpace: "nowrap" }}
              >
                {category.category}
              </div>
            </>
          );
        })}
      </>
    );
  }
};

export default CategoryTags;
