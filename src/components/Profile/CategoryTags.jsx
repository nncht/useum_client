const CategoryTags = ({ currentUser }) => {
  return (
    <div className="mb-3">
      <span className="inline-block bg-slate-500 text-white text-xs px-2 py-1 rounded">
        Category Name
      </span>

      {/* <div className="flex">
            {currentUser.categories.map((category) => {
              return (
                <div key={category} className="mr-3">
                    <span className="inline-block bg-slate-500 text-white text-xs px-2 py-1 rounded">
                        {category}
                    </span>
                </div>
              );
            })}
          </div> */}
    </div>
  );
};

export default CategoryTags;
