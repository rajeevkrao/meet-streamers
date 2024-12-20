<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { liveVideos } = data;
	const nextPageToken = liveVideos.nextPageToken || '';
	let items = liveVideos.items;

	let pageToken = nextPageToken;

	function openVideoInNewTab(url: string) {
		window.open(`https://www.youtube.com/watch?v=${url}`, '_blank', 'noopener,noreferrer');
	}

	async function loadMore() {
		const response = await fetch(`/api/fetchVideos?pageToken=${pageToken}`);
		const result = await response.json();
		pageToken = result.nextPageToken;
		items = [...items, ...result.items];
	}
</script>

<div class="card-container">
	{#each items as item}
		<Card.Root on:click={() => openVideoInNewTab(item.id)}>
			<Card.Content
				><div class="card-body">
					<img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
					<div class="video-title">{item.snippet.title}</div>
					<div class="channel-title">{item.snippet.channelTitle}</div>
					{#if item.liveStreamingDetails.concurrentViewers}
						<div class="watching">{item.liveStreamingDetails.concurrentViewers} Watching</div>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	{/each}
</div>

<div class="load-more">
	{#if pageToken}
	<Button on:click={loadMore}>Load More...</Button>
	{/if}
</div>

<style>
	.card-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		gap: 1rem;
		margin: 2rem;
	}
	.card-body {
		width: 20rem;
	}
	.video-title {
		font-weight: bold;
	}
	.channel-title,
	.watching {
		font-weight: 500;
		color: #444;
	}
	.load-more {
		position: fixed;
		bottom: 0;
		right: 0;
	}
</style>
