<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Toolbar, type IFMToolbar, type IFMToolbarOptionsInputParams, type StateInputParams } from '@flexmonster/js'

interface Props {
  state?: StateInputParams
  options?: IFMToolbarOptionsInputParams
  for: string
}

const props = defineProps<Props>()

const wrapperRef = ref<HTMLElement | null>(null)
const toolbar = ref<IFMToolbar | null>(null)

onMounted(() => {
  const options = props.for ? { ...props.options, for: props.for } : props.options;
  toolbar.value = Toolbar(wrapperRef.value!, {
    state: props.state,
    options: options,
  })
})

onUnmounted(() => {
  if (toolbar.value) {
    toolbar.value.dispose()
    toolbar.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMToolbar> = {
  get(_, prop) {
    const instance = toolbar.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        toolbar.value
          ? (toolbar.value as any)[prop]?.apply(toolbar.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
  has(_, prop) {
    const instance = toolbar.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = toolbar.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = toolbar.value
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

defineExpose(new Proxy({} as IFMToolbar, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;"></div>
</template>
