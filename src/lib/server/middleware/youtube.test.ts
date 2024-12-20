import { it } from 'vitest';
import { getValorantLiveVideos } from './youtube';

it('returns streamers videos', { timeout: 30 * 1000 }, async () => {
	const response = await getValorantLiveVideos();
	// Costly Test
	/* do {
			response = await getValorantLiveVideos(response?.nextPageToken);
		console.log(response?.nextPageToken);
	} while (response?.nextPageToken); */
	console.log({ response });
	response.items.forEach((item) => console.log(item));
});
