import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  data?: any; // Or a more specific type if you know the structure of the external API response
  message?: string;
  error?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
): Promise<void> {
	try {
		const externalApiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Replace with your external API URL

		const externalApiResponse = await fetch(externalApiUrl);

		if (!externalApiResponse.ok) {
			throw new Error(`External API error: ${externalApiResponse.status} ${externalApiResponse.statusText}`);
		}

		const data = await externalApiResponse.json();

		res.status(200).json({ data }); // Send the data from the external API
	} catch (error: any) {
		console.error('Error fetching data from external API:', error);
		res.status(500).json({ error: error.message || 'Internal server error' });
	}
}