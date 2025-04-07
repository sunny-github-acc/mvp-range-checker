import { JSX } from 'react';
import { useState, useEffect, useRef, ReactElement } from 'react';
import { toast } from 'sonner';

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  img: ReactElement;
}

const UploadWidget = ({ img } : UploadWidgetProps): JSX.Element => {
	const [cloudinaryReady, setCloudinaryReady] = useState(false);
	const widgetRef = useRef(null) as any;

	const cloudName = 'dgxaoqjyu';
	const uploadPreset = 'default';

	const uwConfig = {
		cloudName,
		uploadPreset,
		multiple: true,
		maxImageFileSize: 2000000
	};

	useEffect(() => {
		const CLOUDINARY_SCRIPT_URL = 'https://widget.cloudinary.com/v2.0/global/all.js';
		const existingScript = document.querySelector(`script[src="${CLOUDINARY_SCRIPT_URL}"]`) as HTMLScriptElement;

		if (existingScript) {
			existingScript.onload = () => setCloudinaryReady(true);
			if (window.cloudinary) setCloudinaryReady(true);
			return;
		}

		const script = document.createElement('script');
		script.src = CLOUDINARY_SCRIPT_URL;
		script.async = true;
		script.onload = () => setCloudinaryReady(true);
		document.body.appendChild(script);

		return () => {
			script.onload = null;
		};
	}, []);

	useEffect(() => {
		if (cloudinaryReady && !widgetRef.current) {
			widgetRef.current = window.cloudinary.createUploadWidget(
				uwConfig,
				(error: any, result: any) => {
					if (!error && result?.event === 'success') {
						toast('Image uploaded');
					} else if (error) {
						toast('Upload failed');
					}
				}
			);

			toast('Uploading ready');
		}
	}, [cloudinaryReady]);

	const handleUploadClick = () => {
		if (widgetRef.current) {
			widgetRef.current.open();
		} else {
			toast('Uploading not ready');
		}
	};

	return (
		<button onClick={handleUploadClick} disabled={!cloudinaryReady} className='cursor-pointer'>
			{img}
		</button>
	);
};

export default UploadWidget;
