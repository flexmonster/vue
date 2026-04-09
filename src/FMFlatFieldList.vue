<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FlatFieldList, type IFMFlatFieldList, type IFMFlatFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster'

interface Props {
  state?: StateInputParams
  options?: IFMFlatFieldListOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const flatFieldList = ref<IFMFlatFieldList | null>(null)

onMounted(() => {
  flatFieldList.value = FlatFieldList(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (flatFieldList.value) {
    flatFieldList.value.dispose()
    flatFieldList.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMFlatFieldList> = {
  get(_, prop) {
    const instance = flatFieldList.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        flatFieldList.value
          ? (flatFieldList.value as any)[prop]?.apply(flatFieldList.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
}

defineExpose(new Proxy({} as IFMFlatFieldList, handler))
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
