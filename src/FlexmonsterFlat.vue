<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FlatTable } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flatTable = ref(null)

onMounted(() => {
  flatTable.value = FlatTable(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (flatTable.value) {
    flatTable.value.dispose()
    flatTable.value = null
  }
})

defineExpose({ flatTable })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
