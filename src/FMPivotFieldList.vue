<script setup lang="ts">
import { ref, shallowRef, markRaw, onMounted, onUnmounted } from 'vue'
import { PivotFieldList, type IFMPivotFieldList, type IFMPivotFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/js'

interface Props {
  state?: StateInputParams
  options?: IFMPivotFieldListOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const pivotFieldList = shallowRef<IFMPivotFieldList | null>(null)

onMounted(() => {
  pivotFieldList.value = markRaw(PivotFieldList(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  }));
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
  has(_, prop) {
    const instance = pivotFieldList.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = pivotFieldList.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = pivotFieldList.value
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

defineExpose(new Proxy({} as IFMPivotFieldList, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;">  </div>
</template>
