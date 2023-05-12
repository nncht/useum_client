const CollectionHeader = ({ collection }) => {
  return (
    <div id="collection-header">
      <img
        src={
          collection.imageUrl === "" || collection.imageUrl === "No image"
            ? "/images/default/default-collection.svg"
            : collection.imageUrl
        }
        alt={collection.name}
      />
    </div>
  );
};

export default CollectionHeader;
