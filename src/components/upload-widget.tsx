import { JSX } from 'react';
import { useState, useRef, ReactElement } from 'react';
import { toast } from 'sonner';

interface UploadWidgetProps {
  img: ReactElement;
}

const UploadWidget = ({ img }: UploadWidgetProps): JSX.Element => {
	const [isUploading, setIsUploading] = useState(false);

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleUploadClick = () => {
		if (fileInputRef?.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (files && files.length > 0) {
			const formData = new FormData();

			Object.values(files).forEach((file) => formData.append('file', file));
			formData.append('upload_preset', 'original');

			setIsUploading(true);
			toast('Uploading images...');

			try {
				const response = await fetch('/api/upload-images', {
					method: 'POST',
					body: formData
				});
				const data = await response.json();

				toast(data?.message || data?.error);
			} catch {
				toast('Upload failed');
			} finally {
				setIsUploading(false);
			}
		}
	};

	return (
		<div>
			<button onClick={handleUploadClick} disabled={isUploading} className='cursor-pointer'>
				{img}
			</button>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
				accept="image/*"
				multiple
			/>
		</div>
	);
};

export default UploadWidget;
