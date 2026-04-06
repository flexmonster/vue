<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Toolbar } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const toolbar = ref(null)

onMounted(() => {
  toolbar.value = Toolbar(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (toolbar.value) {
    toolbar.value.dispose()
    toolbar.value = null
  }
})

defineExpose({ toolbar })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
