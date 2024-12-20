import { getValorantLiveVideos } from '$lib/server/middleware/youtube';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const liveVideos = await getValorantLiveVideos();
	return {
		liveVideos
	};
};
