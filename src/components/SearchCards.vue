<template>
	<Transition name="flip" mode="out-in">
		<!-- #region first -->
		<ElCard v-if="flip" class="px-0" :style="{ height: `${webHeight - 128}px` }" style="position: relative">
			<ElRow class="" :gutter="0" justify="start" align="middle">
				<ElInput v-model="searchTitle" class="el-col success" placeholder="曲名" @keyup.enter="searchLyricsList($event)">
					<template #prefix>
						<font-awesome-icon :icon="['fas', 'fa-music']"></font-awesome-icon>
					</template>
				</ElInput>
				<ElInput v-model="searchArtist" class="el-col ml-3 success" placeholder="歌手名" @keyup.enter="searchLyricsList($event)">
					<template #prefix>
						<font-awesome-icon :icon="['fas', 'fa-microphone']"></font-awesome-icon>
					</template>
				</ElInput>
				<ElButton class="ml-3 success" plain circle :disabled="!canSearch" @click="searchLyricsList($event)">
					<font-awesome-icon :icon="['fas', 'fa-magnifying-glass']"></font-awesome-icon>
				</ElButton>
			</ElRow>

			<ElRow class="mt-3" :gutter="0" justify="center" align="middle">
				<ElCol :span="4">
					<ElTag type="warning" class="w-100" effect="dark">搜尋紀錄</ElTag>
				</ElCol>

				<ElCol :span="20" class="pl-3">
					<ElTag v-for="(item, i) in 5" :key="`tag${i}`" class="mr-3 history-tag" round effect="dark" @click="searchLyricsList($event, '123', undefined)">
						{{ item }}
					</ElTag>
				</ElCol>

				<ElCol class="mt-3" :span="24">
					<Transition name="fade">
						<div v-if="lyricsCards && lyricsCards.length > 0">
							<!-- height = web height - (128 + 106) -->
							<RecycleScroller
								class="min-scroll success-scroll scroll-darken"
								:items="lyricsCards"
								:item-size="142"
								key-field="id"
								v-slot="{ item }"
								:style="{ height: `${webHeight - 234}px` }"
								style="overflow-y: scroll"
							>
								<ElCard class="lyrics-list-card" shadow="never">
									<template #header>
										<div class="header">
											<span class="title">{{ item.title }}</span>

											<div class="complex-icon ml-auto">
												<span>
													<font-awesome-icon :icon="['fas', 'fa-list']"></font-awesome-icon>
													<font-awesome-icon :class="true ? 'check' : 'error'" :icon="['fas', true ? 'fa-check' : 'fa-close']" size="xs"></font-awesome-icon>
												</span>
											</div>

											<span class="subtitle"
												><small>{{ item.artist }}</small>
											</span>
										</div>
									</template>

									<ElRow class="body" :gutter="0" align="middle">
										<ElButton round @click="searchLyricsContent($event, item.lyricsID)"> {{ item.lyricsID }} </ElButton>

										<ElTooltip placement="top" effect="light" :hide-after="50">
											<template #content>
												<div style="max-width: 200px">
													{{ item.lyricsShort }}
												</div>
											</template>
											<ElTag class="ml-auto" round effect="plain">
												<font-awesome-icon :icon="['fas', 'fa-ellipsis']"></font-awesome-icon>
											</ElTag>
										</ElTooltip>
									</ElRow>
								</ElCard>
							</RecycleScroller>
						</div>
					</Transition>
				</ElCol>
			</ElRow>
		</ElCard>
		<!-- #endregion -->
		<!-- #region Second -->
		<ElCard v-else class="px-0" :style="{ height: `${webHeight - 128}px` }" style="position: relative">
			<ElButton class="" circle>
				<font-awesome-icon :icon="['fas', 'fa-arrow-left']"></font-awesome-icon>
			</ElButton>

			<ElDivider style="margin-top: 12px"></ElDivider>

			<ElRow class="lyrics-content-header" :gutter="0" align="middle" justify="start">
				<ElCol :span="22" class="title">{{ lyrcisContent?.title || '456' }}</ElCol>
				<ElCol :span="2" class="action">
					<ElButton circle>
						<font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon>
					</ElButton>
				</ElCol>

				<ElCol :span="24" class="subtitle">
					<small>
						{{ lyrcisContent?.artist || 122 }}
					</small>
				</ElCol>
			</ElRow>

			<ElDivider style="margin: 12px -12px; width: calc(100% + 24px)"></ElDivider>

			<div class="min-scroll success-scroll" style="overflow-y: scroll; height: 600px; color: var(--color-teal)">
				<div v-html="lyrcisContent?.lyricsContent"></div>
			</div>
		</ElCard>
		<!-- #endregion -->
	</Transition>

	<ElButton class="mt-3 w-100" @click="flip = !flip">FLIP</ElButton>
</template>

<script setup lang="ts">
	import { Ref } from 'vue';
	import { SearchLyrcisDto, SearchLyricsItemResponseDto, SearchLyricsListResponseDto, SearchLyricsContentResponseDto } from '@/types/search';

	// #region basic
	// const webWidth: number = inject('webWidth', window.innerWidth);
	const webHeight: number = inject('webHeight', window.innerHeight);
	/**song 關鍵字 */
	const searchTitle = ref('');
	/**artist 關鍵字 */
	const searchArtist = ref('');
	/**是否可以搜尋 */
	const canSearch = computed(() => searchTitle.value != '' || searchArtist.value != '' || import.meta.env.DEV);
	/**歌詞搜尋結果 */
	const lyricsCards: Ref<SearchLyricsListResponseDto> = ref([]);
	/**歌詞內容 */
	const lyrcisContent: Ref<SearchLyricsContentResponseDto | undefined> = ref(undefined);
	/**歌詞搜尋紀錄 */
	const searchRecords: Ref<SearchLyrcisDto[]> = ref([]);
	/**是否顯示歌詞內容 */
	const showLyricsContent = ref(false);
	// #endregion

	const flip = ref(true);

	onMounted(() => {
		// console.log(webHeight);
		loadSearchRecord();
	});

	const showLyricsPanel = computed(() => {
		return lyrcisContent.value && showLyricsContent.value;
	});

	const loadSearchRecord = () => {
		//
	};

	const searchLyricsList = async (event: Event, title?: string, artist?: string) => {
		lyricsCards.value = [];
		await nextTick();

		axios
			.get<SearchLyricsListResponseDto>('http://localhost:8888/api/lyrics', {
				responseType: 'json',
				responseEncoding: 'utf8',
				params: {
					title: title || searchTitle.value,
					artist: artist || searchArtist.value
				}
			})
			.then((res) => {
				console.log(res.data);
				lyricsCards.value = res.data;
			})
			.finally(() => {
				(event.target as HTMLElement).blur();
			});
	};

	const searchLyricsContent = async (event: Event, lyricsID: string) => {
		//

		axios
			.get<SearchLyricsContentResponseDto>(`http://localhost:8888/api/lyrics/${lyricsID}`, {
				responseType: 'json',
				responseEncoding: 'utf8'
			})
			.then((res) => {
				console.log(res);
				lyrcisContent.value = res.data;
				showLyricsContent.value = lyrcisContent ? true : false;
			})
			.finally(() => {
				//
			});
	};
</script>

<style lang="scss" scoped>
	.history-tag {
		position: relative;
		cursor: pointer;

		&:hover {
			position: relative;
			border-width: 1px;
			border-color: transparent;
			background-color: var(--el-color-success);

			&::before {
				content: '';
				position: absolute;
				left: -1px;
				top: -1px;
				height: calc(100% + 2px);
				width: calc(100% + 2px);
				border-radius: 50%;
				background-color: #cdcdcd88;
			}
		}

		&:active {
			border-width: 1px;
			border-color: transparent;
			background-color: var(--el-color-success);

			&::before {
				content: '';
				position: absolute;
				left: -1px;
				top: -1px;
				height: calc(100% + 2px);
				width: calc(100% + 2px);
				border-radius: 50%;
				background-color: #89898988;
			}
		}
	}

	.lyrics-list-card {
		position: relative;
		width: calc(100% - 12px);
		height: 100%;
		// min-height: 140px;
		// background-color: red;

		.header {
			display: inline-flex;
			flex-wrap: wrap;
			width: 100%;
			position: relative;
			align-items: center;

			> .title {
				overflow-x: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: calc(100% - 32px);
			}

			> .subtitle {
				color: grey;
				overflow-x: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 100%;
			}
		}

		.body {
			// background-color: red;
			.el-button {
				--el-button-active-border-color: var(--el-color-success);
				--el-button-hover-border-color: var(--el-color-success);
				--el-button-hover-text-color: var(--el-color-success);
			}

			.el-tag {
				height: 32px;
				width: 40px;
			}
		}
	}

	.lyrics-content-header {
		.title {
			// color: red;
		}

		.action {
			text-align: right;
			margin-left: auto;

			.el-button {
				width: 32px;
				height: 32px;
				aspect-ratio: 1;
			}
		}

		.subtitle {
			color: grey;
		}
	}

	// #region animate
	.flip-enter-active,
	.flip-leave-active {
		transition: all 0.5s ease;
	}

	.flip-enter-from,
	.flip-leave-to {
		transform: rotateY(0.25turn);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}

	.fade-enter-from {
		opacity: 0.16;
		transform: translateY(100%);
	}

	.fade-leave-to {
		opacity: 0;
	}
	// #endregion
</style>
