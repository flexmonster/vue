<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { PivotTable, type IFMPivotTable, type IFMPivotTableOptionsInputParams, type StateInputParams } from '@flexmonster/js'

interface Props {
  state?: StateInputParams
  options?: IFMPivotTableOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const pivotTable = ref<IFMPivotTable | null>(null)

onMounted(() => {
  pivotTable.value = PivotTable(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (pivotTable.value) {
    pivotTable.value.dispose()
    pivotTable.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMPivotTable> = {
  get(_, prop) {
    const instance = pivotTable.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        pivotTable.value
          ? (pivotTable.value as any)[prop]?.apply(pivotTable.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
  has(_, prop) {
    const instance = pivotTable.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = pivotTable.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = pivotTable.value
    if (!instance || !(prop in instance)) return undefined
    return (
      Reflect.getOwnPropertyDescriptor(instance, prop) ?? {
        configurable: true,
        enumerable: true,
        value: (instance as any)[prop],
      }
    )
  },
}

defineExpose(new Proxy({} as IFMPivotTable, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;">  </div>
</template>
