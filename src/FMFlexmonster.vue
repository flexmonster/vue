<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Flexmonster, type IFMComposite, type IFMCompositeOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster'

interface Props {
  state?: StateInputParams
  options?: IFMCompositeOptionsInputParams
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const flexmonster = ref<IFMComposite | null>(null)

onMounted(() => {
  flexmonster.value = Flexmonster(wrapperRef.value!, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (flexmonster.value) {
    flexmonster.value.dispose()
    flexmonster.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMComposite> = {
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
}

defineExpose(new Proxy({} as IFMComposite, handler))
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
