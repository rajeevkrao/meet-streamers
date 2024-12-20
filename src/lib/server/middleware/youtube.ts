import { google } from 'googleapis';

export const getValorantLiveVideos = async (pageToken?: any) => {
	const youtube = google.youtube({
		version: 'v3',
		auth: process.env.GOOGLE_API_KEY
	});

	// Step 1: Search for live videos
	const searchResponse = await youtube.search.list({
		part: 'snippet',
		q: '"valorant" hindi',
		type: 'video',
		eventType: 'live', // Filter for live videos
		videoCaption: 'any', // Include videos with or without captions
		regionCode: 'IN', // Target India for Hindi language videos
		maxResults: 10, // Number of results
		pageToken
	});

	const { items: liveVideos, nextPageToken, pageInfo } = searchResponse.data;

	/* console.log({ resp: searchResponse.data }); */

	if (liveVideos.length === 0) {
		console.log('No live videos found.');
		return;
	}

	// Extract video IDs from search results
	const videoIds = liveVideos.map((video) => video.id.videoId).join(',');

	console.log('Fetched video IDs:', videoIds);

	// Step 2: Get liveStreamingDetails for the video IDs
	const detailsResponse = await youtube.videos.list({
		part: 'snippet,liveStreamingDetails',
		id: videoIds // Pass the video IDs as a comma-separated list
	});

	const result = detailsResponse.data;

	result.nextPageToken = nextPageToken;
	result.pageInfo = pageInfo;

	return result;
};
