import axios from 'axios';
import API_URL from '../../services/apiConfig';

const storedToken = localStorage.getItem('authToken');

const handleFileUpload = (setHeaderImageUrl, e, setUploadingHeaderImage) => {
	const uploadData = new FormData();

	uploadData.append('headerImageUrl', e.target.files[0]);

	setUploadingHeaderImage(true);

	axios
		.post(`${API_URL}/upload-header`, uploadData,
		{
			headers: { Authorization: `Bearer ${storedToken}` },
		})
		.then((response) => {
			setHeaderImageUrl(response.data.fileUrl);
			setUploadingHeaderImage(false);
			console.log('File uploaded successfully: ', response);
		})
		.catch((err) => {
			console.log('Error while uploading the file: ', err);
			setUploadingHeaderImage(false); // Set uploadingImage back to false in case of an error
		});
};

const HeaderImageUploader = ({ setHeaderImageUrl, message, setUploadingHeaderImage }) => {
	return (
		<div>
			<div className='row'>
				<label className='text-md text-gray-600' htmlFor='image'>
					{' '}
					{message}{' '}
				</label>
			</div>

			<div className='row mt-2 mb-4'>
				<input
					type='file'
					id='image'
					onChange={(e) => handleFileUpload(setHeaderImageUrl, e, setUploadingHeaderImage)}
				/>
			</div>
		</div>
	);
};

export default HeaderImageUploader;
