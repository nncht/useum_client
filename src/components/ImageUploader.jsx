import axios from 'axios';

const API_URL = 'http://localhost:5005';

const handleFileUpload = (setImageUrl, e) => {
	const uploadData = new FormData();

	uploadData.append('imageUrl', e.target.files[0]);

	axios
		.post(`${API_URL}/upload`, uploadData)
		.then((response) => {
			setImageUrl(response.data.fileUrl);
		})
		.catch((err) => console.log('Error while uploading the file: ', err));
};

const ImageUploadFormComponent = ({ setImageUrl, message }) => {
	return (
		<>
			<label htmlFor='image'> {message} </label>
			<input type='file' id='image' onChange={(e) => handleFileUpload(setImageUrl, e)} />
		</>
	);
};

export default ImageUploadFormComponent;
