import { useState } from 'react';
import PropTypes from 'prop-types';

function CreateCollectionForm({ onCreateCollection }) {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
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
  
      onCreateCollection(name);
      setName('');
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

CreateCollectionForm.propTypes = {
    onCreateCollection: PropTypes.func.isRequired,
  };

export default CreateCollectionForm;