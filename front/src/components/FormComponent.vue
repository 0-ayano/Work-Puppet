<template>
	<div class="frame">
		<div class="forms">
			<div v-for="command in operation" :key="command.id" class="input-command">
				<select v-model="command.command">
					<option value="">ーー 命令 ーー</option>
					<option v-for="(option, index) in options" :key="option" :value="values[index]">{{ option }}</option>
				</select>
				:
				<input type="number" placeholder="ーー 指令値 ーー" v-model="command.value">
			</div>
		</div>
		<button class="form_control_plus" @click="addCommand">+</button>
		<button class="form_control_minus" @click="removeCommand">-</button>

		<button v-if="flag_run" class="btn_start" @click="start_experiment">実行</button>
		<div v-else="flag_run" class="running">実行中</div>
		<button class="btn_stop" @click="stop_experiment">緊急停止</button>
	</div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import JSON from '../assets/control.json'
import { result_experiment } from '../stores/counter'

const operation = ref([{ id: 1, command: null, value: null }]);

const flag_run = ref([true]);

const options = ref([])

const values = ref([])

const result = result_experiment()

onMounted(() => {
	for (var i = 0; i < JSON.length; i++) {
		options.value.push(JSON[i].title)
		values.value.push(JSON[i].value)
	}
})


const addCommand = () => {
	const newCommandId = operation.value.length + 1;
	operation.value.push({ id: newCommandId, command: null, value: null });
}

const removeCommand = () => {
	if (operation.value.length > 1) {
		operation.value.pop();
	}
}

const start_experiment = async () => {
	for (const command of operation.value) {
		flag_run.value = false

		if (!command.command || command.value === null || command.value === undefined || command.value === '') {
			alert("入力されていない箇所があるため、実行できません。")
			return;
		}
	}

	await control_experiment()
	flag_run.value = true
}

const stop_experiment = () => {
	// alert("私のために争わないで")
	flag_run.value = true
}

const control_experiment = async () => {
	var max_power = ref(255)
	var min_power = ref(0)
	var interval = ref(10)
	var speed_ms = ref(1000)
	var loop = ref(1)

	for (var i = 0; i < operation.value.length; i++) {
		// console.log(operation.value[i].command, operation.value[i].value)
		if (operation.value[i].command == 1) {
			max_power.value = operation.value[i].value
		}

		else if (operation.value[i].command == 2) {
			min_power.value = operation.value[i].value
		}

		else if (operation.value[i].command == 3) {
			interval.value = operation.value[i].value
		}

		else if (operation.value[i].command == 4) {
			loop.value = operation.value[i].value
		}

		else if (operation.value[i].command == 10 && flag_run == false) {
			await serial_run(10, operation.value[i].value)
			await delay(speed_ms.value)
			// await serial_run(0, 1)
		}

		else if (operation.value[i].command == 20) {
			for (var tmp = min_power.value; tmp <= max_power.value; tmp += interval.value) {
				if (flag_run == true){
					await serial_run(10, 0)
					break;
				}

				await serial_run(10, tmp)
				await delay(speed_ms.value)
				// await serial_run(0, 1)
			}

			for (var tmp = max_power.value; tmp >= min_power.value; tmp -= interval.value) {
				if (flag_run == true){
					await serial_run(10, 0)
					break;
				}

				await serial_run(10, tmp)
				await delay(speed_ms.value)
				// await serial_run(0, 1)
			}
		}
	}

	await serial_run(10, 0)
}

const serial_run = async (operation, num) => {
	console.log(operation, num)
	const url = 'http://localhost:8000/serial/' + operation + '/' + num

	axios.get(url).then((res) => {
		result.push_result(parseInt(res.data.replace(/\r|\n/g, "")))

	})
}

const delay = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
</script>

<style scoped>
.frame {
	position: absolute;
	width: 40%;
	height: 85%;
	border: 5px var(--color-blue) solid;
}

.forms {
	position: absolute;
	width: 100%;
	height: 80%;
	overflow: scroll;
	overflow-x: hidden;
	border-bottom: 5px var(--color-blue) solid;
	text-align: center;
}

.forms::-webkit-scrollbar {
	width: 15px;
	height: 10px;
}

.forms::-webkit-scrollbar-track {
	background: var(--color-grey1);
}

.forms::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background: var(--color-grey2);
}

input,
select {
	position: relative;
	text-align: center;
	font-size: 100%;
	width: 35%;
	aspect-ratio: 6 / 1;
	margin: 3% 0 3% 0;
}

.form_control_plus {
	position: absolute;
	width: 8%;
	aspect-ratio: 1;

	border: 2px solid var(--color-blue);
	color: var(--color-blue);
	font-size: x-large;
	background: var(--color-white);
	border-radius: 5px;

	right: 5%;
	top: 60%;
}

.form_control_minus {
	position: absolute;
	width: 8%;
	aspect-ratio: 1;

	border: 2px solid var(--color-blue);
	color: var(--color-blue);
	font-size: x-large;
	background: var(--color-white);
	border-radius: 5px;

	right: 5%;
	top: 68%;
}

.btn_start {
	position: absolute;
	width: 40%;

	border: 2px solid var(--color-blue);
	color: var(--color-blue);
	font-size: xx-large;
	background: var(--color-white);
	border-radius: 5px;

	left: 6%;
	bottom: 5%;
}

.running {
	position: absolute;
	width: 40%;

	text-align: center;
	color: var(--color-blue);
	font-size: xx-large;
	border-radius: 5px;

	left: 6%;
	bottom: 5%;
}

.btn_stop {
	position: absolute;
	width: 40%;

	border: 2px solid var(--color-blue);
	color: var(--color-blue);
	font-size: xx-large;
	background: var(--color-white);
	border-radius: 5px;

	right: 6%;
	bottom: 5%;
}

button:hover {
	color: var(--color-white);
	background: var(--color-blue);
}

button:active {
	color: var(--color-white);
	background: var(--color-orange);
}
</style>