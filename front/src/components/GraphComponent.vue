<template>
	<div class="chart-container"></div>
	<!-- <div class="chart-container" @click="showChart"></div> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'

import { result_experiment } from '../stores/counter'


const result = result_experiment()
const renderCharts = () => {
	const options = {
		chart: {
			type: 'line',
			zoomType: 'x',
		},
		title: {
			text: '',
		},
		xAxis: {
			labels: {
				enabled: false,
			},
			categories: result.id,
		},
		yAxis: {
			title: {
				text: '結果'
			},
		},
		series: [{
			name: "測定値",
			data: result.result,
		}],
	}

	console.log(result.result, result.id)
	const chartContainer = document.querySelector('.chart-container')
	const graph_title = "最新の結果 : " + result.result[result.result.length - 1]
	options.title.text = [graph_title]
	Highcharts.chart(chartContainer, options)
}

watch(result.result, renderCharts)
onMounted(renderCharts);

const showChart = () => {
	const popupContainer = document.createElement('div')
	const popupChartContainer = document.createElement('div')
	popupChartContainer.style.width = '600px'
	popupChartContainer.style.height = '400px'
	popupContainer.appendChild(popupChartContainer)

	const options = {
		chart: {
			type: 'line',
			zoomType: 'x',
		},
		title: {
			text: '',
		},
		xAxis: {
			labels: {
				enabled: false,
			},
			categories: result.id,
		},
		yAxis: {
			title: {
				text: '結果'
			},
		},
		series: [{
			name: "測定値",
			data: result.result,
		}],
	}

	Highcharts.chart(popupChartContainer, options)

	// Open the popup
	window.open('', '_blank', 'width=600,height=400').document.body.appendChild(popupContainer)
}
</script>

<style scoped></style>