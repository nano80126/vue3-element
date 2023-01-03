<template>
	<div>
		<ElCard class="px-0">
			<!-- <template #header>
				<span>Header</span>
			</template> -->

			<ElRow class="mx-n2 mt-n2" :gutter="0" justify="start" align="middle">
				<ElInput v-model="searchSong" class="el-col" placeholder="曲名">
					<template #prefix>
						<font-awesome-icon :icon="['fas', 'fa-music']" size="md"></font-awesome-icon>
					</template>
				</ElInput>
				<ElInput v-model="searchArtist" class="el-col ml-3" placeholder="歌手名">
					<template #prefix>
						<font-awesome-icon :icon="['fas', 'fa-microphone']"></font-awesome-icon>
					</template>
				</ElInput>
				<ElButton class="ml-3" circle :disabled="!canSearch" @click="getLyrics()">
					<font-awesome-icon :icon="['fas', 'fa-magnifying-glass']"></font-awesome-icon>
				</ElButton>
			</ElRow>

			<ElRow class="mx-n2 mt-3">
				<ElTag type="warning" class="mr-3" effect="dark">搜尋紀錄</ElTag>

				<ElTag v-for="(item, i) in 5" :key="`tag${i}`" class="mr-3 history-tag" round effect="dark" @click="getLyrics('123', undefined)">
					{{ item }}
				</ElTag>
			</ElRow>

			<div class="mx-n2 mt-3">
				<div v-bind="containerProps" class="min-scroll primary-scroll" style="overflow-y: auto; height: 720px">
					<div v-bind="wrapperProps">
						<ElCard v-for="(card, idx) in list" :key="`card${idx}`" class="mb-3">
							<template #header>
								<div class="mx-n2 card-header">
									<span class="">{{ card.data.title }}</span>
								</div>
							</template>
							{{ card.data.id }}

							<ElDivider class="mx-n5" content-position="center"></ElDivider>

							123
						</ElCard>
					</div>
				</div>
			</div>
			<!-- <span class="mx-n2 card-header">123555555555555555555555555555555555555555555555555555555</span> -->
		</ElCard>

		<!-- <ElInput v-model="searchSong" class="radius" style="border-radius: 20px"></ElInput>

		<div class="radius" style="border-radius: 20px; border: 1px solid red">
			<ElInput v-model="searchArtist" class="radius" style="border: 1px solid red"></ElInput>
		</div>

		<ElButton @click="getLyrics">搜尋</ElButton> -->
	</div>
</template>

<script setup lang="ts">
	import { useVirtualList } from '@vueuse/core';

	const webHeight: number = inject('webHeight', window.innerHeight);
	const searchSong = ref('怪物');
	const searchArtist = ref('');
	const canSearch = computed(() => searchSong.value != '' || searchArtist.value != '' || process.env.NODE_ENV == 'development_dep');

	const lyricsCards = ref([]);
	// const lyricCards = ref(Array<LyricsCrawled>());

	const getLyrics = (song?: string, artist?: string) => {
		axios
			.get('http://localhost:8888/api/lyrics', {
				params: {
					song: song || searchSong.value,
					aritest: artist || searchArtist.value
				}
			})
			.then((res) => {
				console.log(res);
				lyricsCards.value = res.data.data;
			});
	};

	const { list, containerProps, wrapperProps } = useVirtualList(lyricsCards, {
		itemHeight: 140,
		overscan: 10
	});

	const searchLyrics = () => {
		let song = searchSong.value;
		let artist = searchArtist.value;

		console.log(searchSong.value, searchArtist.value);
	};

	// const filterItems = computed(() => {
	// 	return props.cardList;
	// });
	// const { list, containerProps, wrapperProps } = useVirtualList(filterItems, {
	// 	itemHeight: 80,
	// 	overscan: 10
	// });

	onMounted(() => {
		console.log(process.env.NODE_ENV);
	});
</script>

<style lang="scss" scoped>
	.history-tag {
		position: relative;
		cursor: pointer;

		&:hover {
			border-width: 1px;
			border-color: transparent;
			background-color: rgba($color: #57ba3a, $alpha: 1);
		}

		&:active {
			border-width: 1px;
			border-color: transparent;
			background-color: rgba($color: #308edf, $alpha: 1);
		}
	}

	.card-header {
		position: relative;
		display: inline-flex;
		width: calc(100% + 16px);
		// background-color: blue;

		> span {
			// position: absolute;
			// left: 0;
			// top: 0;
			display: inline-block;
			overflow: hidden;
			background-color: red;
			white-space: nowrap;
			text-overflow: ellipsis;
			// width: 80%;
		}
	}

	span.card-header {
	}
</style>
