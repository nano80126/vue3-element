<template>
	<div class="complex-icon">
		<font-awesome-icon :icon="mainIcon"></font-awesome-icon>
		<font-awesome-icon :class="type" :icon="subIcon" size="xs"></font-awesome-icon>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps<{
		mainIcon: Array<string>;
		subIcon: Array<string>;
		type: 'success' | 'warning' | 'error' | 'info' | 'primary';
	}>();

	onMounted(() => {
		console.log(props.mainIcon);
		console.log(props.subIcon);
	});

	// defineProps<{ subIcon: string[] }>();
</script>

<style scoped lang="scss">
	div.complex-icon {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: red;

		svg + svg {
			position: absolute;
			bottom: 12%;
			right: 12%;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: var(--el-bg-color-overlay);

			&.success {
				color: var(--el-color-success);
			}

			&.error {
				color: var(--el-color-error);
			}
		}
	}
</style>
