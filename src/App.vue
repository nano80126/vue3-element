<template>
	<!-- <div style="width: 1920px; position: relative; min-height: 200px; border: 1px solid blue"></div> -->

	<!-- <div style="width: 100%; border: 1px solid red"> -->
	<ElContainer class="main-container" direction="vertical">
		<ElHeader class="appbar" :height="`${appbarHeight}px`">
			<ElRow justify="end" align="middle">
				<span v-if="isDev" class="mx-auto" style="color: red; font-weight: bold">{{ appbarHeight }}</span>
				<ElButton color="transparent">
					<font-awesome-icon icon="fa-solid fa-window-minimize" size="lg"></font-awesome-icon>
				</ElButton>

				<ElButton color="transparent">
					<font-awesome-icon icon="fa-regular fa-window-maximize" size="lg"></font-awesome-icon>
				</ElButton>
				<ElButton color="transparent">
					<font-awesome-icon icon="fa-solid fa-xmark" size="lg"></font-awesome-icon>
				</ElButton>
				<!-- <el-button>Default</el-button> -->
			</ElRow>
		</ElHeader>

		<ElContainer class="middle-container" direction="horizontal">
			<!-- :width="`${navigationWidth}px`" -->
			<ElAside class="navigation" :width="`${navigationWidth}px`">
				<ElMenu defaultActive="/" :collapse="true" backgroundColor="transparent" router style="height: 100%">
					<ElMenuItem v-for="(r, index) in routes" :key="`${r.meta?.title}-${index}`" class="nav-item" :index="r.path">
						<ElIcon size="16">
							<font-awesome-icon :icon="r.meta?.icon"></font-awesome-icon>
						</ElIcon>
						<template #title>{{ r.meta?.title }}</template>
					</ElMenuItem>

					<!-- <ElMenuItem class="nav-item" index="/Sub" style="background-color: transparent">
						<ElIcon>
							<font-awesome-icon :icon="['fas', 'fa-list']" size="md"></font-awesome-icon>
						</ElIcon>
						<template #title>List</template>
					</ElMenuItem> -->
				</ElMenu>
			</ElAside>

			<ElMain>
				<router-view></router-view>
			</ElMain>
		</ElContainer>

		<ElFooter class="app-footer" :height="`${footerHeight}px`">
			<ElRow justify="end" align="middle" style="height: 100%">
				<span v-if="isDev" class="mx-auto" style="color: red; font-weight: bold">{{ footerHeight }}</span>

				<ElCol v-if="isDev" :span="3" class="text-right footer-info">
					<span>Resolution:</span>
					<span>{{ webWidth }}</span>
					<span class="x">x</span>
					<span>{{ webHeight }}</span>
				</ElCol>
				<ElCol v-else :span="3" class="text-right" style="margin-left: auto">
					&copy; {{ new Date().getFullYear() }}
					<strong> Elecrawler </strong>
				</ElCol>
			</ElRow>
		</ElFooter>
	</ElContainer>

	<!-- <el-container>
			<el-aside width="200px">Aside</el-aside>
			<el-container>
				<el-header>Header</el-header>
				<el-main>Main</el-main>
				<el-footer>Footer</el-footer>
			</el-container>
		</el-container> -->
	<!-- </div> -->

	<!-- <span>123</span> -->
	<!-- <el-button>Default</el-button> -->
	<!-- <el-row class="mb-4">
			<ElButton>Default</ElButton>
			<ElButton type="primary" class="radius" style="border-radius: 8px">Primary</ElButton>
			<ElButton type="success">Success</ElButton>
			<ElButton type="info">Info</ElButton>
			<ElButton type="warning">Warning</ElButton>
			<ElButton type="danger">Danger</ElButton>
		</el-row> -->

	<!-- <ElRow>
			<el-input class="radius" v-model="input" placeholder="Please input" clearable style="border-radius: 20px" />
		</ElRow>

		<ElRow>
			<div class="radius" style="border-radius: 25px; border: 1px solid red">50</div>
		</ElRow> -->

	<!-- <a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a> -->
	<!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
	import { routes } from '@/router';

	const appbarHeight = 32;
	const navigationWidth = 64;
	const footerHeight = 24;

	let webWidth = ref(window.innerWidth);
	let webHeight = ref(window.innerHeight);

	// const input = ref('');
	const isDev = computed(() => {
		return import.meta.env.DEV;
	});

	provide('webWidth', webWidth);
	provide('webHeight', webHeight);

	onMounted(() => {
		window.addEventListener('resize', () => {
			webHeight.value = window.innerHeight;
			webWidth.value = window.innerWidth;
		});
	});
</script>

<style scoped lang="scss">
	.main-container {
		height: 100%;
		width: 100%;
	}

	.middle-container {
		height: 100%;
	}

	.appbar {
		padding: 0;
		background-color: #424242;

		button {
			// margin-left: 0;
			width: 36px;
			height: 32px;
		}
	}
	.navigation {
		background-color: var(--el-color-warning-light-8);
	}

	.nav-item {
		background-color: transparent;
	}

	.app-footer {
		padding: 0 12px;
		// background-color: var(--el-color-info-light-5);
		background-color: #37474f;

		.footer-info {
			> span.x {
				margin: 0 12px;
			}
		}
	}

	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
