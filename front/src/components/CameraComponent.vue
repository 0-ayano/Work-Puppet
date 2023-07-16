<template>
	<div>
		<img class="camera" v-bind:src=video_url />
		<div class="button-container">
			<!-- <button :class="{ 'btn': true, 'active': active_camera === 1 }" @click="change_camera(1)">1</button> -->
			<!-- <button :class="{ 'btn': true, 'active': active_camera === 2 }" @click="change_camera(2)">2</button> -->
			<!-- <button :class="{ 'btn': true, 'active': active_camera === 3 }" @click="change_camera(3)">3</button> -->
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const video_url = ref("http://127.0.0.1:8000/camera/0")
const active_camera = ref(1)

const change_camera = (num) => {
	const url = "http://127.0.0.1:8000/camera/" + (num - 1)
	video_url.value = url
	active_camera.value = num
}
</script>
  
<style scoped>
.camera {
	position: relative;
	width: 100%;
	background-color: var(--color-blue);
	aspect-ratio: 16 / 11;
}

.button-container {
	display: flex;
	position: absolute;
	bottom: 5%;
	right: 1%;
	background-color: transparent;
}

.btn {
	color: var(--color-white);
	background-color: var(--color-blue);
	border: 0;
	cursor: pointer;
	font-size: x-large;
	margin: 0 5px;
	padding: 10px 20px;
	border-radius: 8px;
}

.active {
	color: var(--color-white);
	background-color: var(--color-orange);
}
</style>
  