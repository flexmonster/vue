<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PivotFieldList, type IFMPivotFieldList, type IFMPivotFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster'

interface Props {
  state?: StateInputParams
  options?: IFMPivotFieldListOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const pivotFieldList = ref<IFMPivotFieldList | null>(null)

onMounted(() => {
  pivotFieldList.value = PivotFieldList(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (pivotFieldList.value) {
    pivotFieldList.value.dispose()
    pivotFieldList.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMPivotFieldList> = {
  get(_, prop) {
    const instance = pivotFieldList.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        pivotFieldList.value
          ? (pivotFieldList.value as any)[prop]?.apply(pivotFieldList.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
}

defineExpose(new Proxy({} as IFMPivotFieldList, handler))
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
