<template>
	<ElCard class="px-0"> </ElCard>

	<v-card :height="webHeight - 80" class="">
		<v-toolbar color="primary" dark extended flat>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>
			<v-spacer />
		</v-toolbar>

		<!-- <v-card class="ml-auto col" style="margin-top: -48px"> -->
		<v-row no-gutters align-content="center" justify="end">
			<v-col cols="auto" class="mx-3">
				<v-toolbar class="ml-auto" color="transparent" density="compact" flat style="margin-top: -48px; min-width: 320px">
					<v-text-field
						v-model="searchQuery"
						class="my-0 pr-0"
						density="compact"
						variant="solo"
						single-line
						hide-details
						placeholder="搜尋"
						prepend-inner-icon="mdi-youtube"
						append-inner-icon="mdi-magnify"
						style="min-width: 320px"
						@keyup.enter="search"
						@click:append-inner="search"
					/>
				</v-toolbar>
			</v-col>
		</v-row>

		<div v-bind="containerProps" class="my-3 min-scroll primary-scroll" style="overflow-y: scroll" :style="{ height: `${webHeight - 216}px` }">
			<div v-bind="wrapperProps" style="position: relative">
				<!-- <transition name="fade">
					<div v-if="list.length > 0"> -->
				<transition-group name="fade">
					<v-card v-for="(card, index) in list" :key="`card1${index}`" class="mx-auto mb-3 youtube-card" variant="outlined" color="grey">
						<v-row no-gutters>
							<v-col cols="6">
								<v-img
									class="mr-auto"
									:src="card.data.snippet.thumbnails.medium.url"
									:height="card.data.snippet.thumbnails.medium.height * 1.2"
									:width="card.data.snippet.thumbnails.medium.width * 1.2"
									cover
								/>
							</v-col>
							<v-col cols="6" class="align-self-end">
								<v-card-title class="mr-4" style="white-space: wrap">{{ card.data.snippet.title }}</v-card-title>

								<v-card-subtitle>{{ card.data.snippet.channelTitle }}</v-card-subtitle>

								<v-card-action class="mt-auto">
									<v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart" />
									<v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart" />
									<v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart" />
								</v-card-action>
							</v-col>
						</v-row>
					</v-card>
				</transition-group>
				<!-- </div>
				</transition> -->
			</div>
		</div>

		<!-- </v-col>
		</v-row> -->
		<!-- </v-card> -->
	</v-card>
</template>

<script setup lang="ts">
	import { inject, ref, reactive, nextTick, computed } from 'vue';
	import { useVirtualList } from '@vueuse/core';
	import axios from 'axios';
	import { YouTubeSearchResult } from '@/types/youtube';

	const webHeight: number = inject('webHeight', window.innerHeight);

	/**YouTube API 搜尋字串 */
	const searchQuery = ref('');
	/**YouTube API 搜尋結果 */
	let searchResults = ref(Array<YouTubeSearchResult>());
	/**圖片緩存用陣列*/
	const imageBuffer = [];

	const allItems = ref(new Array<number>());
	const filter = computed(() => {
		return allItems.value;
	});

	const { list, containerProps, wrapperProps } = useVirtualList(searchResults, {
		itemHeight: 228,
		overscan: 8
	});

	// const { list, containerProps, wrapperProps } = useVirtualList(filter, {
	// 	itemHeight: 96,
	// 	overscan: 8
	// });

	const search = async () => {
		axios.get('http://localhost:8888/api/searchYouTube').then(async (res) => {
			searchResults.value = [];
			await nextTick();

			searchResults.value = res.data;

			// res.data.forEach((element: YouTubeSearchResult, i: number) => {
			// 	// setTimeout(() => {
			// 	searchResults.value.push(element);
			// 	// }, i * 200);
			// });
		});
	};
</script>

<style lang="scss" scoped>
	.youtube-card {
		width: 60%;
		height: 216px;
	}

	.fade-enter-active {
		transition: all 0.5s ease;
	}
	.fade-enter-from {
		opacity: 0;
		transform: translateX(100px);
	}
</style>
