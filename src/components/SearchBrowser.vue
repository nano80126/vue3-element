<template>
	<ElCard class="px-0" :style="{ height: `${webHeight - 80}px` }">
		<ElRow justify="center" align="middle">
			<!-- 搜尋用 input -->
			<ElCol :span="6">
				<ElInput v-model="searchQuery" class="ml-auto query-input success" placeholder="搜尋" @keyup.enter="searchYouTubeList($event)">
					<template #prefix>
						<font-awesome-icon :icon="['fab', 'fa-youtube']"></font-awesome-icon>
					</template>
					<template #append>
						<ElButton class="success" @click="searchYouTubeList($event)">
							<font-awesome-icon :icon="['fas', 'fa-search']"></font-awesome-icon>
						</ElButton>
					</template>
				</ElInput>
			</ElCol>
			<!-- 分頁切換 -->
			<ElCol class="px-3 pagination mr-auto" :span="6">
				<ElButton circle plain @click="searchYouTubeList($event, prevToken, 'right')" :disabled="!prevToken">
					<font-awesome-icon :icon="['fas', 'fa-angle-left']"></font-awesome-icon>
				</ElButton>
				<ElButton circle plain @click="searchYouTubeList($event, nextToken, 'left')" :disabled="!nextToken">
					<font-awesome-icon :icon="['fas', 'fa-angle-right']"></font-awesome-icon>
				</ElButton>
			</ElCol>

			<ElDivider style="--el-divider-margin: 12px 0 0 0"></ElDivider>

			<ElCol class="mt-3" :span="24">
				<Transition :name="fadeDir == 'left' ? 'fadeLeft' : 'fadeRight'">
					<div v-if="searchResults && searchResults.length > 0">
						<RecycleScroller class="min-scroll info-scroll" :items="searchResults" :item-size="218" key-field="etag" v-slot="{ item }" :style="{ height: `${webHeight - 163}px` }">
							<ElCard class="youtube-card radius" shadow="never">
								<ElRow :gutter="12" align="top" justify="center">
									<ElCol class="card-image" :span="9">
										<el-image class="h-100" :src="item.snippet.thumbnails.medium.url" fit="contain" />
									</ElCol>

									<ElCol class="card-content" :span="15">
										<p class="title">
											{{ item.snippet.title }}
										</p>
										<ElDivider style="margin: 0"></ElDivider>
										<span class="channel text-right">{{ item.snippet.channelTitle }}</span>
										<!-- <div>{{ item.snippet.description }}</div> -->
										<!-- <ElDivider style="margin-top: auto"></ElDivider> -->
										<div class="action mt-auto" align="middle" justify="center">
											<ElTooltip content="已在列表中" placement="top" effect="light">
												<ElTag round type="success">
													<font-awesome-icon :icon="['fas', 'fa-list']"></font-awesome-icon>
												</ElTag>
											</ElTooltip>

											<!-- <ElTooltip content="取得鏈結" placement="top" effect="light">
										<ElTag round type="success">
											<font-awesome-icon :icon="['fas', 'fa-list']"></font-awesome-icon>
										</ElTag>
									</ElTooltip> -->

											<!-- <ElDivider direction="vertical"></ElDivider> -->

											<ElTooltip content="取得鏈結" placement="top" effect="light">
												<ElButton circle style="margin-left: auto">
													<font-awesome-icon :icon="['fas', 'fa-link']"></font-awesome-icon>
												</ElButton>
											</ElTooltip>

											<ElTooltip content="瀏覽器開啟" placement="top" effect="light">
												<ElButton circle>
													<font-awesome-icon :icon="['fas', 'fa-music']"></font-awesome-icon>
												</ElButton>
											</ElTooltip>

											<ElTooltip content="123" placement="top" effect="light">
												<ElButton class="complex-icon" circle>
													<font-awesome-icon :icon="['fas', 'fa-list']"></font-awesome-icon>
													<font-awesome-icon :icon="['fas', 'fa-plus']" size="xs"></font-awesome-icon>
												</ElButton>
											</ElTooltip>
										</div>
									</ElCol>
								</ElRow>
							</ElCard>
						</RecycleScroller>
					</div>
				</Transition>
			</ElCol>
		</ElRow>
	</ElCard>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';
	import { YouTubeSearchListResponseDto } from '@/types/search';
	import { youtube_v3 } from '@googleapis/youtube';
	import { YouTubeSearchListDto } from '@/types/youtube';

	// const webWidth: number = inject('webWidth', window.innerWidth);
	const webHeight: number = inject('webHeight', window.innerHeight);
	/**YouTube API 搜尋字串 */
	const searchQuery: Ref<string> = ref('');
	const prevToken: Ref<string> = ref('');
	const nextToken: Ref<string> = ref('');
	const fadeDir: Ref<'left' | 'right'> = ref('left');
	/**YouTube API 搜尋結果 */
	let searchResults: Ref<youtube_v3.Schema$SearchResult[] | undefined> = ref([]);

	onMounted(async () => {
		//
	});

	/**
	 *
	 * @deprecated "use searchYouTubeList instead"
	 */
	const searchYouTube = async (event: Event) => {
		axios
			.get<YouTubeSearchListResponseDto>('https://youtube.googleapis.com/youtube/v3/search', {
				responseType: 'json',
				params: {
					q: searchQuery.value,
					part: 'snippet',
					key: import.meta.env.VITE_YT_API,
					maxResults: 20,
					type: 'video'
					// pageToken: nextToken.value || ''
				}
			})
			.then((res) => {
				const { items } = res.data;
				searchResults.value = items;
				nextToken.value = res.data.nextPageToken;
			})
			.finally(() => {
				(event.target as HTMLElement).blur();
			});
	};

	/**YouTube search list from backend */
	const searchYouTubeList = async (event?: Event, token?: string, direction?: 'left' | 'right') => {
		fadeDir.value = direction || 'left';
		searchResults.value = [];
		await nextTick();

		axios
			.get<youtube_v3.Schema$SearchListResponse>('http://localhost:8888/api/youtube', {
				responseType: 'json',
				responseEncoding: 'utf8',
				params: {
					queryString: searchQuery.value,
					pageToken: token || ''
				}
			})
			.then(async (res) => {
				const { prevPageToken, nextPageToken, items } = res.data;
				searchResults.value = items;
				prevToken.value = prevPageToken || '';
				nextToken.value = nextPageToken || '';
			})
			.catch(async (err) => {
				console.error(err);
			})
			.finally(() => {
				(event?.target as HTMLElement).blur();
			});
	};
</script>

<style lang="scss" scoped>
	.pagination {
		.el-button {
			aspect-ratio: 1;
			--el-button-hover-text-color: var(--el-color-success);
			--el-button-hover-border-color: var(--el-color-success);
		}
	}

	.youtube-card {
		position: relative;
		display: flex;
		width: calc(100% - 12px);
		height: 100%;
		min-height: 206px;
		// background-color: red;

		@media screen and (min-width: 1600px) {
			width: 80%;
			margin-left: auto;
			margin-right: auto;
		}

		.el-row {
			position: absolute;
			height: calc(100% - 24px);
			width: calc(100% - 12px);
		}
	}

	.card-image {
		display: flex;
		align-self: center;

		.el-image {
			// position: relative;
			margin: auto;
			top: 0;
			height: 180px;
		}
	}

	.card-content {
		display: flex;
		flex-direction: column;

		.title {
			display: flex;
			padding: 0 0;
			font-weight: bold;

			span {
				margin-left: auto;
			}
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
			display: flex;
			align-items: center;

			.el-tag {
				margin-right: 20px;
				aspect-ratio: 1;
				width: 32px;
				height: 32px;
			}

			.el-button {
				margin-left: 20px;
				aspect-ratio: 1;
				width: 32px;
				height: 32px;
			}
		}
	}

	.fadeLeft-enter-active,
	.fadeLeft-leave-active,
	.fadeRight-enter-active,
	.fadeRight-leave-active {
		transition: all 0.5s ease;
	}

	.fadeLeft-enter-from,
	.fadeRight-leave-to {
		opacity: 0.16;
		transform: translateX(75%);
	}

	.fadeRight-enter-from,
	.fadeLeft-leave-to {
		opacity: 0.16;
		transform: translateX(-75%);
	}
</style>
