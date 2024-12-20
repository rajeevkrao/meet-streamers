import { getValorantLiveVideos } from '$lib/server/middleware/youtube';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const params = url.searchParams;
		const pageToken = params.get('pageToken');
		const res = await getValorantLiveVideos(pageToken);
		return Response.json(res);
	} catch (err) {
		throw error(400, err as Error);
	}
};
