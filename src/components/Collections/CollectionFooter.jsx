const CollectionFooter = ({ collection }) => {
  return (
    <>
      {collection && (
        <div
          style={{
            backgroundImage: `url(${collection.imageUrl})`,
          }}
          className="footer"
        />
      )}
    </>
  );
};

export default CollectionFooter;
