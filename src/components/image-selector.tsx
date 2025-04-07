'use client';

import { useEffect, useState, JSX } from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { CldImage } from 'next-cloudinary';

import { cn } from '../lib/utils';

import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import UploadWidget from './upload-widget';

const imageNames = {
	'UTG': '1_UTG_Opens.png',
	'MP': '2_MP_Opens.png',
	'CO': '3_CO_Opens.png',
	'BU': '4_BU_Opens.png',
	'SB': '5_SB_Opens.png',
	'UTG3B': '6_UTG_Opens_3B.png',
	'MP3B': '7_MP_Opens_3B.png',
	'CO3B': '8_CO_Opens_3B.png',
	'BU3B': '9_BU_Opens_3B.png',
	'SB3B': '10_SB_Opens_3B.png',
	'vsMPvsUTG': '1_MP_vs_UTG.png',
	'vsCOvsUTG': '2_CO_vs_UTG.png',
	'vsCOvsMP': '3_CO_vs_MP.png',
	'vsBUvsUTG': '4_BU_vs_UTG.png',
	'vsBUvsMP': '5_BU_vs_MP.png',
	'vsBUvsCO': '6_BU_vs_CO.png',
	'vsSBvsUTG': '7_SB_vs_UTG.png',
	'vsSBvsMP': '8_SB_vs_MP.png',
	'vsSBvsCO': '9_SB_vs_CO.png',
	'vsSBvsBU': '10_SB_vs_BU.png',
	'vsBBvsUTG': '11_BB_vs_UTG.png',
	'vsBBvsMP': '12_BB_vs_MP.png',
	'vsBBvsCO': '13_BB_vs_CO.png',
	'vsBBvsBU': '14_BB_vs_BU.png',
	'vsBBvsSB': '15_BB_vs_SB.png',
	'vsMPvsUTG4B': '16_MP_vs_UTG_4B.png',
	'vsCOvsUTG4B': '17_CO_vs_UTG_4B.png',
	'vsCOvsMP4B': '18_CO_vs_MP_4B.png',
	'vsBUvsUTG4B': '19_BU_vs_UTG_4B.png',
	'vsBUvsMP4B': '20_BU_vs_MP_4B.png',
	'vsBUvsCO4B': '21_BU_vs_CO_4B.png',
	'vsSBvsUTG4B': '22_SB_vs_UTG_4B.png',
	'vsSBvsMP4B': '23_SB_vs_MP_4B.png',
	'vsSBvsCO4B': '24_SB_vs_CO_4B.png',
	'vsSBvsBU4B': '25_SB_vs_BU_4B.png',
	'vsBBvsUTG4B': '26_BB_vs_UTG_4B.png',
	'vsBBvsMP4B': '27_BB_vs_MP_4B.png',
	'vsBBvsCO4B': '28_BB_vs_CO_4B.png',
	'vsBBvsBU4B': '29_BB_vs_BU_4B.png',
	'vsBBvsSB4B': '30_BB_vs_SB_4B.png'
};

interface ImageOption {
  id: string;
  label: string;
  src: string;
  alt: string;
  description: string;
  sub: {
    id: string;
    label: string;
    src: string;
    alt: string;
    description: string;
  };
}

const imageOptions = [
	{
		id: 'utg',
		label: 'UTG',
		src: imageNames.UTG,
		alt: 'UTG',
		description: 'UTG',
		sub: {
			id: 'utg3b',
			label: 'UTG (3B)',
			src: imageNames.UTG3B,
			alt: 'UTG (3B)',
			description: 'UTG (3B)'
		}
	},
	{
		id: 'mp',
		label: 'MP',
		src: imageNames.MP,
		alt: 'MP',
		description: 'MP',
		sub: {
			id: 'mp3b',
			label: 'MP (3B)',
			src: imageNames.MP3B,
			alt: 'MP (3B)',
			description: 'MP (3B)'
		}
	},
	{
		id: 'co',
		label: 'CO',
		src: imageNames.CO,
		alt: 'CO',
		description: 'CO',
		sub: {
			id: 'co3b',
			label: 'CO (3B)',
			src: imageNames.CO3B,
			alt: 'CO (3B)',
			description: 'CO (3B)'
		}
	},
	{
		id: 'bu',
		label: 'BU',
		src: imageNames.BU,
		alt: 'BU',
		description: 'BU',
		sub: {
			id: 'bu3b',
			label: 'BU (3B)',
			src: imageNames.BU3B,
			alt: 'BU (3B)',
			description: 'BU (3B)'
		}
	},
	{
		id: 'sb',
		label: 'SB',
		src: imageNames.SB,
		alt: 'SB',
		description: 'SB',
		sub: {
			id: 'sb3b',
			label: 'SB (3B)',
			src: imageNames.SB3B,
			alt: 'SB (3B)',
			description: 'SB (3B)'
		}
	}
];

const vsImageOptions = [
	{
		id: 'vsMPvsUTG',
		label: 'MP vs UTG',
		src: imageNames.vsMPvsUTG,
		alt: 'MP vs UTG',
		description: 'MP vs UTG',
		sub: {
			id: 'vsMPvsUTG4B',
			label: 'MP vs UTG (4B)',
			src: imageNames.vsMPvsUTG4B,
			alt: 'MP vs UTG (4B)',
			description: 'MP vs UTG (4B)'
		}
	},
	{
		id: 'vsCOvsUTG',
		label: 'CO vs UTG',
		src: imageNames.vsCOvsUTG,
		alt: 'CO vs UTG',
		description: 'CO vs UTG',
		sub: {
			id: 'vsCOvsUTG4B',
			label: 'CO vs UTG (4B)',
			src: imageNames.vsCOvsUTG4B,
			alt: 'CO vs UTG (4B)',
			description: 'CO vs UTG (4B)'
		}
	},
	{
		id: 'vsCOvsMP',
		label: 'CO vs MP',
		src: imageNames.vsCOvsMP,
		alt: 'CO vs MP',
		description: 'CO vs MP',
		sub: {
			id: 'vsCOvsMP4B',
			label: 'CO vs MP (4B)',
			src: imageNames.vsCOvsMP4B,
			alt: 'CO vs MP (4B)',
			description: 'CO vs MP (4B)'
		}
	},
	{
		id: 'vsBUvsUTG',
		label: 'BU vs UTG',
		src: imageNames.vsBUvsUTG,
		alt: 'BU vs UTG',
		description: 'BU vs UTG',
		sub: {
			id: 'vsBUvsUTG4B',
			label: 'BU vs UTG (4B)',
			src: imageNames.vsBUvsUTG4B,
			alt: 'BU vs UTG (4B)',
			description: 'BU vs UTG (4B)'
		}
	},
	{
		id: 'vsBUvsMP',
		label: 'BU vs MP',
		src: imageNames.vsBUvsMP,
		alt: 'BU vs MP',
		description: 'BU vs MP',
		sub: {
			id: 'vsBUvsMP4B',
			label: 'BU vs MP (4B)',
			src: imageNames.vsBUvsMP4B,
			alt: 'BU vs MP (4B)',
			description: 'BU vs MP (4B)'
		}
	},
	{
		id: 'vsBUvsCO',
		label: 'BU vs CO',
		src: imageNames.vsBUvsCO,
		alt: 'BU vs CO',
		description: 'BU vs CO',
		sub: {
			id: 'vsBUvsCO4B',
			label: 'BU vs CO (4B)',
			src: imageNames.vsBUvsCO4B,
			alt: 'BU vs CO (4B)',
			description: 'BU vs CO (4B)'
		}
	},
	{
		id: 'vsSBvsUTG',
		label: 'SB vs UTG',
		src: imageNames.vsSBvsUTG,
		alt: 'SB vs UTG',
		description: 'SB vs UTG',
		sub: {
			id: 'vsSBvsUTG4B',
			label: 'SB vs UTG (4B)',
			src: imageNames.vsSBvsUTG4B,
			alt: 'SB vs UTG (4B)',
			description: 'SB vs UTG (4B)'
		}
	},
	{
		id: 'vsSBvsMP',
		label: 'SB vs MP',
		src: imageNames.vsSBvsMP,
		alt: 'SB vs MP',
		description: 'SB vs MP',
		sub: {
			id: 'vsSBvsMP4B',
			label: 'SB vs MP (4B)',
			src: imageNames.vsSBvsMP4B,
			alt: 'SB vs MP (4B)',
			description: 'SB vs MP (4B)'
		}
	},
	{
		id: 'vsSBvsCO',
		label: 'SB vs CO',
		src: imageNames.vsSBvsCO,
		alt: 'SB vs CO',
		description: 'SB vs CO',
		sub: {
			id: 'vsSBvsCO4B',
			label: 'SB vs CO (4B)',
			src: imageNames.vsSBvsCO4B,
			alt: 'SB vs CO (4B)',
			description: 'SB vs CO (4B)'
		}
	},
	{
		id: 'vsSBvsBU',
		label: 'SB vs BU',
		src: imageNames.vsSBvsBU,
		alt: 'SB vs BU',
		description: 'SB vs BU',
		sub: {
			id: 'vsSBvsBU4B',
			label: 'SB vs BU (4B)',
			src: imageNames.vsSBvsBU4B,
			alt: 'SB vs BU (4B)',
			description: 'SB vs BU (4B)'
		}
	},
	{
		id: 'vsBBvsUTG',
		label: 'BB vs UTG',
		src: imageNames.vsBBvsUTG,
		alt: 'BB vs UTG',
		description: 'BB vs UTG',
		sub: {
			id: 'vsBBvsUTG4B',
			label: 'BB vs UTG (4B)',
			src: imageNames.vsBBvsUTG4B,
			alt: 'BB vs UTG (4B)',
			description: 'BB vs UTG (4B)'
		}
	},
	{
		id: 'vsBBvsMP',
		label: 'BB vs MP',
		src: imageNames.vsBBvsMP,
		alt: 'BB vs MP',
		description: 'BB vs MP',
		sub: {
			id: 'vsBBvsMP4B',
			label: 'BB vs MP (4B)',
			src: imageNames.vsBBvsMP4B,
			alt: 'BB vs MP (4B)',
			description: 'BB vs MP (4B)'
		}
	},
	{
		id: 'vsBBvsCO',
		label: 'BB vs CO',
		src: imageNames.vsBBvsCO,
		alt: 'BB vs CO',
		description: 'BB vs CO',
		sub: {
			id: 'vsBBvsCO4B',
			label: 'BB vs CO (4B)',
			src: imageNames.vsBBvsCO4B,
			alt: 'BB vs CO (4B)',
			description: 'BB vs CO (4B)'
		}
	},
	{
		id: 'vsBBvsBU',
		label: 'BB vs BU',
		src: imageNames.vsBBvsBU,
		alt: 'BB vs BU',
		description: 'BB vs BU',
		sub: {
			id: 'vsBBvsBU4B',
			label: 'BB vs BU (4B)',
			src: imageNames.vsBBvsBU4B,
			alt: 'BB vs BU (4B)',
			description: 'BB vs BU (4B)'
		}
	},
	{
		id: 'vsBBvsSB',
		label: 'BB vs SB',
		src: imageNames.vsBBvsSB,
		alt: 'BB vs SB',
		description: 'BB vs SB',
		sub: {
			id: 'vsBBvsSB4B',
			label: 'BB vs SB (4B)',
			src: imageNames.vsBBvsSB4B,
			alt: 'BB vs SB (4B)',
			description: 'BB vs SB (4B)'
		}
	}
];

export default function ImageSelector(): JSX.Element {
	const [images, setImages] = useState(imageOptions);
	const [selectedOption, setSelectedOption] = useState(images[0]);
	const [isSub, setIsSub] = useState(false);
	const [prevOption, setPrevOption] = useState(0);
	const [prevSub, setPrevSub] = useState(false);
	const [fetchedImages, setFetchedImages] = useState<{ [key: string]: any }>({});
	const [isLoading, setIsLoading] = useState(false);

	const cld = new Cloudinary({ cloud: { cloudName: 'dgxaoqjyu' } });

	const option = isSub ? selectedOption.sub : selectedOption;
	const buttonStyles = 'w-full sm:w-auto hover:bg-black hover:border-gray-400 min-w-[130px]';

	const handleOpenButton = (isOpen: boolean) => {
		const options = isOpen ? vsImageOptions : imageOptions;
		const updatedOptions = isOpen ? imageOptions : vsImageOptions;

		if (images === options) {
			setImages(updatedOptions);
			setSelectedOption(updatedOptions[prevOption]);
			setPrevOption(images.findIndex((item) => item.id === selectedOption.id));
			setIsSub(prevSub);
			setPrevSub(isSub);
			setImage(updatedOptions[prevOption], prevSub);
		}
	};

	const handleSubButton = (option: ImageOption | null) => {
		if (option) {
			setSelectedOption(option);
			setIsSub(false);
			setImage(option, false);
		} else {
			setIsSub(true);
			setImage(selectedOption, true);
		}
	};

	const setImage = (image: ImageOption, isSub: boolean) => {
		const imageName = isSub ? image.sub.src : image.src;

		if (fetchedImages[imageName]) {
			return;
		}

		setIsLoading(true);

		const img = cld
			.image(imageName)
			.format('auto')
			.quality('auto')
			.resize(auto().gravity(autoGravity()));

		setFetchedImages((prev) => ({
			...prev,
			[imageName]: img
		}));
	};

	useEffect(() => {
		document.documentElement.classList.add('dark');
		setImage(selectedOption, false);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Sending GET request to your API route
				const response = await fetch('/api/handleImages');

				// If the response is successful, parse the JSON and set the message state
				if (response.ok) {
					const data = await response.json();
					console.log('🚀 ~ fetchData ~ data:', data);
					// setMessage(data.message);
				} else {
					console.error('Failed to fetch data');
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="dark flex justify-center overflow-hidden items-center p-6 bg-background text-foreground transition-colors duration-200 min-h-screen">
			<div className="w-full space-y-8 flex flex-col items-center justify-center  mx-[10%]">
				{fetchedImages[option.src] ? <UploadWidget img={
					<CldImage
						src={fetchedImages[option.src].publicID}
						alt='image'
						width="600"
						height="600"
						className={`
              w-full max-h-[75vh] object-contain transition-all duration-300
              ${isLoading ? 'opacity-50' : 'opacity-100'}
            `}
						onLoad={() =>  setIsLoading(false)}
					/>
				}
				/> : null
				}

				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4  w-full">
					<div className="flex flex-col justify-center gap-3 w-full">
						<div className="flex gap-1">
							<Button
								variant="outline"
								className={`${buttonStyles} ${images === vsImageOptions ? 'bg-muted' : 'border-gray-500'}`}
								onClick={() => handleOpenButton(true)}
							>
                Open
							</Button>
							<Button
								variant="outline"
								className={`${buttonStyles} ${images === imageOptions ? 'bg-muted' : ' border-gray-500'}`}
								onClick={() => handleOpenButton(false)}
							>
                vs Open
							</Button>
						</div>

						<Separator />

						<div className="flex flex-wrap gap-1">
							{images.map((opt) => (
								<Button
									variant="outline"
									key={opt.id}
									onClick={() => handleSubButton(opt)}
									className={cn(
										buttonStyles,
										option.id === opt.id ? 'border-gray-500' : 'bg-muted'
									)}
								>
									{opt.label}
								</Button>
							))}
						</div>

						<Separator />

						<div className="flex flex-wrap gap-1">
							<Button
								variant="outline"
								onClick={() => handleSubButton(null)}
								className={cn(
									buttonStyles,
									isSub ? 'border-gray-500' : 'bg-muted'
								)}
							>
								{images === imageOptions ? '(3B)' : '(4B)'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

