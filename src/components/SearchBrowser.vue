<template>
	<ElCard class="px-0" :style="{ height: `${webHeight - 80}px` }">
		<ElRow justify="center" align="middle">
			<ElCol :span="6">
				<ElInput v-model="searchQuery" class="ml-auto" placeholder="搜尋" @keyup.enter="searchYouTube">
					<template #prefix>
						<font-awesome-icon :icon="['fab', 'fa-youtube']"></font-awesome-icon>
					</template>
					<template #append>
						<ElButton class="radius" @click="searchYouTube">
							<font-awesome-icon :icon="['fas', 'fa-search']"></font-awesome-icon>
						</ElButton>
					</template>
				</ElInput>
			</ElCol>

			<ElCol class="px-3 pagination" :span="6">
				<ElButton circle>
					<font-awesome-icon :icon="['fas', 'fa-search']"></font-awesome-icon>
				</ElButton>
				<ElButton circle>
					<font-awesome-icon :icon="['fas', 'fa-search']"></font-awesome-icon>
				</ElButton>
			</ElCol>

			<ElCol class="" :span="12" style="background-color: #ffaaff88"> {{ nextToken }} </ElCol>

			<ElDivider style="--el-divider-margin: 12px 0 0 0"></ElDivider>

			<!-- 163 -->
			<ElCol class="browser-content mt-3" :span="24">
				<RecycleScroller class="scroller min-scroll info-scroll" :items="searchResults" :item-size="218" key-field="etag" v-slot="{ item }" :style="{ height: `${webHeight - 163}px` }">
					<ElCard class="youtube-card radius" shadow="never">
						<ElRow :gutter="12" align="top" justify="center">
							<ElCol class="card-image" :span="9">
								<el-image class="h-100" :src="item.snippet.thumbnails.medium.url" fit="contain" />
							</ElCol>

							<ElCol class="card-content" :span="15">
								<p class="title">{{ item.snippet.title }}</p>
								<ElDivider style="margin: 0"></ElDivider>
								<span class="channel text-right">{{ item.snippet.channelTitle }}</span>
								<!-- <div>{{ item.snippet.description }}</div> -->
								<!-- <ElDivider style="margin-top: auto"></ElDivider> -->
								<div class="action mt-auto" align="middle" justify="end">
									<!-- 取得連結 -->
									<!-- 加入 -->
									<!-- 瀏覽器開啟 -->
									<ElButton circle style="margin-left: 20px">
										<font-awesome-icon :icon="['fas', 'fa-music']"></font-awesome-icon>
									</ElButton>

									<ElButton circle style="margin-left: 20px">
										<font-awesome-icon :icon="['fas', 'fa-music']"></font-awesome-icon>
									</ElButton>

									<ElButton circle style="margin-left: 20px">
										<font-awesome-icon :icon="['fas', 'fa-magnifying-glass']"></font-awesome-icon>
									</ElButton>
								</div>
							</ElCol>
						</ElRow>
					</ElCard>
				</RecycleScroller>
			</ElCol>

			<!-- <ElDivider style="--el-divider-margin: 0px 0px"></ElDivider>   -->
		</ElRow>
	</ElCard>
</template>

<script setup lang="ts">
	import { inject, ref, nextTick, VueElement } from 'vue';
	import { YouTubeSearchListResponseDto, YouTubeSearchListResponseItemDto } from '@/types/search';
	import { ElButtonGroup } from 'element-plus';

	const webWidth: number = inject('webWidth', window.innerWidth);
	const webHeight: number = inject('webHeight', window.innerHeight);
	/**YouTube API 搜尋字串 */
	const searchQuery = ref('');
	const nextToken = ref('');
	/**YouTube API 搜尋結果 */
	let searchResults = ref(Array<YouTubeSearchListResponseItemDto>());

	// let youTube: YT.youtube_v3.Youtube;

	onMounted(async () => {
		//
	});

	const searchYouTube = async (event: Event) => {
		axios
			.get('https://youtube.googleapis.com/youtube/v3/search', {
				responseType: 'json',
				params: {
					q: searchQuery.value,
					part: 'snippet',
					key: import.meta.env.VITE_YT_API,
					maxResults: 20,
					type: 'video',
					pageToken: nextToken.value || ''
				}
			})
			.then((res) => {
				const { items } = res.data as YouTubeSearchListResponseDto;
				searchResults.value = items;
				nextToken.value = res.data.nextPageToken;
				console.log(res);
				console.log(items);
			})
			.finally(() => {
				(event.target as VueElement).blur();
			});
	};

	const search = async () => {
		axios.get('http://localhost:8888/api/searchYouTube').then(async (res) => {
			searchResults.value = [];
			await nextTick();

			searchResults.value = res.data;
		});
	};
</script>

<style lang="scss" scoped>
	.pagination {
		.el-button {
			margin: 0;
		}
	}

	.youtube-card {
		display: flex;
		position: relative;
		min-height: 206px;
		height: 100%;
		width: 98%;
		// background-color: red;

		@media screen and (min-width: 1600px) {
			width: 80%;
			margin-left: auto;
			margin-right: auto;
		}

		.el-row {
			// background-color: yellow;
			position: absolute;
			height: calc(100% - 24px);
			width: calc(100% - 12px);
		}
	}

	.card-image {
		display: flex;
		align-self: center;

		.el-image {
			position: absolute;
			margin: auto;
			top: 0;
			height: 180px;
		}
	}

	.card-content {
		display: flex;
		flex-direction: column;

		.title {
			padding: 0 0;
			font-weight: bold;
		}

		.el-divider--horizontal {
			margin: 0;

			&:last-child {
				margin-top: auto;
			}
		}

		.channel {
			margin-top: 12px;
			padding: 0 12px;
			text-align: right;
			font-weight: normal;
		}

		.action {
			// margin-top: auto;
		}
	}

	.fade-enter-active {
		transition: all 0.5s ease;
	}
	.fade-enter-from {
		opacity: 0;
		transform: translateX(100px);
	}
</style>
