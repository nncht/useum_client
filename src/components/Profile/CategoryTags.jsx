import { useContext } from "react";
import { UserDataContext } from "../../context/userData.context";

const CategoryTags = () => {
  const { userData } = useContext(UserDataContext);

  if (userData && userData.categories) {
    return (
      <div className="mb-3">
        <div className="flex">
          {userData.categories.map((category) => {
            return (
              <div key={category._id} className="mr-3">
                <span className="inline-block bg-slate-500 text-white text-xs px-2 py-1 rounded">
                  {category.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default CategoryTags;
