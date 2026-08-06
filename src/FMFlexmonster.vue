<script setup lang="ts">
import { ref, shallowRef, markRaw, onMounted, onUnmounted } from 'vue'
import { Flexmonster, type IFMFlexmonster, type IFMFlexmonsterOptionsInputParams, type StateInputParams } from '@flexmonster/js'

interface Props {
  state?: StateInputParams
  options?: IFMFlexmonsterOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const flexmonster = shallowRef<IFMFlexmonster | null>(null)

onMounted(() => {
  flexmonster.value = markRaw(Flexmonster(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  }));
})

onUnmounted(() => {
  if (flexmonster.value) {
    flexmonster.value.dispose()
    flexmonster.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMFlexmonster> = {
  get(_, prop) {
    const instance = flexmonster.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        flexmonster.value
          ? (flexmonster.value as any)[prop]?.apply(flexmonster.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
  has(_, prop) {
    const instance = flexmonster.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = flexmonster.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = flexmonster.value
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

defineExpose(new Proxy({} as IFMFlexmonster, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;"></div>
</template>
