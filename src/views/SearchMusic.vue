<template>
	<div class="">
		<ElRow :gutter="12" justify="center">
			<ElCol class="left-col" style="background-color: #33559900">
				<SearchCards />
			</ElCol>
			<ElCol class="right-col" style="background-color: #33998800">
				<SearchBrowser />
			</ElCol>
		</ElRow>
	</div>
</template>

<script setup lang="ts">
	onMounted(() => {
		// axios.get('http://localhost:8888/api/listCards/1').then((res) => {
		// 	console.log(res);
		// });
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
	.left-col {
		min-width: 360px;
		flex: 0 0 25%;
	}

	.right-col {
		flex: 1 1;
	}
</style>
