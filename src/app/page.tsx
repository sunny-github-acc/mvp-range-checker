import { JSX } from 'react';
import ImageSelector from '../components/image-selector';
import { Toaster } from '../components/ui/sonner';

const Home = () : JSX.Element =>
	<>
		<ImageSelector />
		<Toaster />
	</>;

export default Home;
