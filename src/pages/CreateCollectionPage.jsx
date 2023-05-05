import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateCollectionForm from '../components/CreateCollectionForm';
import CreateItemForm from '../components/CreateItemForm';

function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch('http://localhost:5005/collections');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };
    fetchCollections();
  }, []);

  const handleCreateCollection = async (name) => {
    try {
      const response = await fetch('http://localhost:5005/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage(`Collection "${name}" created successfully!`);
      setSelectedCollection(name);
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleCreateItem = async (name, description) => {
    try {
      const response = await fetch('http://localhost:5005/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, collection: selectedCollection }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage(`Item "${name}" created successfully!`);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <h1>Collections</h1>
      <div>
        <h2>Create Collection</h2>
        <CreateCollectionForm onCreateCollection={handleCreateCollection} />
      </div>
      {selectedCollection ? (
        <div>
          <h2>Create Item for Collection {selectedCollection}</h2>
          <CreateItemForm onCreateItem={handleCreateItem} />
        </div>
      ) : (
        <p>Please select a collection to create items for.</p>
      )}
      {successMessage && <p>{successMessage}</p>}
      <div>
        <h2>Collections List</h2>
        <ul>
            {Array.isArray(collections) && collections.map((collection) => (
                <li key={collection.id}>
                    <Link to="/" onClick={() => setSelectedCollection(collection.name)}>
                        {collection.name}
                    </Link>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CollectionsPage;