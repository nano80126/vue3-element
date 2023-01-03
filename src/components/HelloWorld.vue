<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<!-- <button type="button" @click="count++" style="background-color: aliceblue">count is {{ count }}</button> -->
		<ElButton @click="count++">count is {{ count }}</ElButton>

		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test HMR
		</p>
	</div>

	<p>
		Check out
		<a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
	</p>

	<p>
		Install
		<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		in your IDE for a better DX
	</p>
	<p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useStore } from '@/store';

	defineProps<{ msg: string }>();

	const store = useStore();

	onMounted(() => {
		console.log(store);
		console.log(store.state.count);
	});

	const count = ref(0);
</script>

<style scoped lang="scss">
	.read-the-docs {
		color: #888;
	}
</style>
