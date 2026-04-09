<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FlatTable, type IFMFlatTable, type IFMFlatTableOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster'

interface Props {
  state?: StateInputParams
  options?: IFMFlatTableOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const flatTable = ref<IFMFlatTable | null>(null)

onMounted(() => {
  flatTable.value = FlatTable(wrapperRef.value!, {
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

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMFlatTable> = {
  get(_, prop) {
    const instance = flatTable.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        flatTable.value
          ? (flatTable.value as any)[prop]?.apply(flatTable.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
}

defineExpose(new Proxy({} as IFMFlatTable, handler))
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
