<template>
	<div>
		<ElRow :gutter="20" justify="start">
			<ElCol :span="6" class="blue">
				<!-- :style="{
					'max-width': `${firstColMaxWidth}px`
				}" -->
				<SearchCards />
			</ElCol>
			<ElCol :span="18" style="background-color: #33998855">
				<ElButton @click="testPost">測試 POST</ElButton>
				<ElButton @click="testDelete">測試 DELETE</ElButton>
				<ElButton @click="testPut">測試 PUT</ElButton>
				<ElButton @click="testPatch">測試 PATCH</ElButton>
			</ElCol>
		</ElRow>

		<!-- <v-row no-gutters justify="stretch">
			<v-col
				class="mx-3 mt-3"
				:style="{
					'max-width': `${firstColMaxWidth}px`
				}"
			> -->
		<!-- :cardList="LyricsCrawlered"  -->
		<!-- <SearchCards /> -->
		<!-- <ElButton type="danger">test</ElButton> -->
		<!-- </v-col> -->

		<!-- <v-col class="mr-3 mt-3">
				<ElButton @click="testPost">測試 POST</ElButton>
				<ElButton @click="testDelete">測試 DELETE</ElButton>
				<ElButton @click="testPut">測試 PUT</ElButton>
				<ElButton @click="testPatch">測試 PATCH</ElButton> -->
		<!-- <div ref="dropZoneRef">Drop files here {{ isOverDropZone }}</div> -->
		<!-- <v-card height="300">
					{{ webWidth }} {{ webHeight }}
					<div class="bg-cyan rounded-xl">123</div>
				</v-card> -->
		<!-- <SearchBrowser /> -->
		<!-- </v-col> -->
		<!-- </v-row> -->
	</div>
</template>

<script setup lang="ts">
	// import SearchCards from '@/components/SearchCards.vue';
	// import SearchBrowser from '@/components/SearchBrowser.vue';

	// import { useDropZone } from '@vueuse/core';
	// import { LyricsCrawled } from '@/types/search';

	// const props = defineProps({
	// 	webWidth: {
	// 		type: Number,
	// 		required: true
	// 	},
	// 	webHeight: {
	// 		type: Number,
	// 		required: true
	// 	}
	// });

	const firstColMaxWidth = 416;

	// let LyricsCrawlered = ref<LyricsCrawled[]>([]);

	onMounted(() => {
		axios.get('http://localhost:8888/api/listCards/1').then((res) => {
			console.log(res);
			// LyricsCrawlered.value = res.data;
		});
		// axios.get('http://localhost:8888/api/ping/1?text=123').then((res) => {
		// 	console.log(res);
		// });
	});

	const testPost = () => {
		axios
			.post('http://localhost:8888/api/ping/1', {
				method: 'post'
			})
			.then((res) => {
				console.log(res.data);
			});
	};

	const testDelete = () => {
		axios.delete('http://localhost:8888/api/ping/1?c=789', { method: 'POST', data: { a: 123 }, params: { b: 456 } }).then((res) => {
			console.log(res.data);
		});
	};

	const testPut = () => {
		axios.put('http://localhost:8888/api/ping/1', { method: 'put' }).then((res) => {
			console.log(res.data);
		});
	};

	const testPatch = () => {
		axios.patch('http://localhost:8888/api/ping/1', { method: 'patch' }).then((res) => {
			console.log(res.data);
		});
	};
</script>

<style lang="scss" scoped>
	.lyrics-card-title {
		position: relative;
		white-space: nowrap;
		> span:nth-child(2) {
			float: right;
		}
	}

	.my-input.v-input {
		// background-color: cyan;
		border-width: 5px;
		border-color: blue;
		border-radius: 20px;

		> .v-field {
			// background-color: red;
			border-width: 5px;
			border-color: red;
			border-radius: 20px;
		}
	}
</style>
