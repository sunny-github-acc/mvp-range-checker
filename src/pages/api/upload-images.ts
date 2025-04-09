import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

type ResponseData = {
  data?: any;
  message?: string;
  error?: string;
};

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage }).array('file', 100);

export const config = {
	api: {
		bodyParser: false
	}
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
): void {
	if (req.method === 'POST') {
		upload(req as any, res as any, async (err: any) => {
			if (err) {
				return res.status(500).json({ error: 'File upload failed' });
			}

			try {
				const files = (req as any).files;

				if (!files || files.length === 0) {
					return res.status(400).json({ error: 'No files uploaded' });
				}

				const uploadResults = await Promise.all(
					files.map((file: Express.Multer.File) =>
						new Promise<{ url: string }>((resolve, reject) => {
							const stream = cloudinary.v2.uploader.upload_stream(
								{
									upload_preset: 'original',
									overwrite: true
								},
								(error: any, result: any) => {
									if (error) return reject(error);
									resolve({ url: result?.secure_url || '' });
								}
							);

							streamifier.createReadStream(file.buffer).pipe(stream);
						})
					)
				);

				res.status(200).json({
					data: uploadResults,
					message: 'Images uploaded successfully'
				});
			} catch (error: any) {
				res.status(500).json({ error: error.message || 'Internal server error' });
			}
		});
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
