<script setup lang="ts">
import { ref, shallowRef, markRaw, onMounted, onUnmounted } from 'vue'
import { FlatTable, type IFMFlatTable, type IFMFlatTableOptionsInputParams, type StateInputParams } from '@flexmonster/js'

interface Props {
  state?: StateInputParams
  options?: IFMFlatTableOptionsInputParams
  name?: string
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const flatTable = shallowRef<IFMFlatTable | null>(null)

onMounted(() => {
  flatTable.value = markRaw(FlatTable(wrapperRef.value!, {
    state: props.state,
    options: props.options,
    name: props.name,
  }));
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
  has(_, prop) {
    const instance = flatTable.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = flatTable.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = flatTable.value
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

defineExpose(new Proxy({} as IFMFlatTable, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;">  </div>
</template>
