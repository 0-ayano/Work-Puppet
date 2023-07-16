import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    return { count, doubleCount, increment }
})

export const result_experiment = defineStore('result', () => {
    const type = ref([])
    const id = ref([])
    const result = ref([])

    function push_result(get_result) {
        id.value.push(id.value.length + 1)
        result.value.push(get_result)
        console.log("--correct--")
    }

    function clear_result() {
        type.value = []
        id.value = []
        result.value = []
    }

    function get_result(){
        return result.value
    }

    return{ type, id, result, push_result, clear_result, get_result }
})