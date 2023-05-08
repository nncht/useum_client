const CollectionHeader = ({ collection }) => {
  return (
    <div id="collection-header">
      <img src={collection.imageUrl} alt={collection.name} />
    </div>
  );
};

export default CollectionHeader;
