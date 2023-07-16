<template>
	<div class="parent">
		<camera class="position_camera"></camera>
		<forms class="position_form"></forms>
		<graph class="position_graph"></graph>
	</div>
</template>

<script setup>
import camera from '../components/CameraComponent.vue'
import forms from '../components/FormComponent.vue';
import graph from '../components/GraphComponent.vue'
</script>

<style scoped>
.parent {
	display: flex;
}

.position_camera {
	position: absolute;
	margin-top: 2%;
	width: 35%;
	left: 5%;
	flex-grow: 1
}

.position_form {
	margin-top: 2%;
	width: 40%;
	left: 50%;
	flex-grow: 1;
}

.position_graph {
	margin-top: 28%;
	margin-left: 5%;
	width: 35%;
	left: 5%;
	aspect-ratio: 16 / 9;
	/* background-color: var(--color-blue); */
}
</style>