<script setup lang="ts">
import { computed, inject, ref, shallowRef, markRaw, onMounted, onUnmounted } from 'vue'
import { Filter, type IFMFilter, type IFilterOptionsInputParams, type StateInputParams } from '@flexmonster/js'
import { FMStateContext } from './FMStateContext'

interface Props {
  state?: StateInputParams
  options?: IFilterOptionsInputParams
  fieldName?: string
}

const props = defineProps<Props>()

const groupState = inject(FMStateContext, undefined)
const state = computed(() => props.state ?? groupState?.value)

const wrapperRef = ref<HTMLElement | null>(null)
const filter = shallowRef<IFMFilter | null>(null)

onMounted(() => {
  filter.value = markRaw(Filter(wrapperRef.value!, {
    state: state.value,
    options: props.options,
    fieldName: props.fieldName!,
  }));
})

onUnmounted(() => {
  if (filter.value) {
    filter.value.dispose()
    filter.value = null
  }
})

const methodCache = new Map<string | symbol, (...args: any[]) => any>()

const handler: ProxyHandler<IFMFilter> = {
  get(_, prop) {
    const instance = filter.value
    if (!instance || !(prop in instance)) return undefined

    const value = (instance as any)[prop]
    if (typeof value !== 'function') return value

    if (!methodCache.has(prop)) {
      methodCache.set(prop, (...args: any[]) =>
        filter.value
          ? (filter.value as any)[prop]?.apply(filter.value, args)
          : undefined
      )
    }
    return methodCache.get(prop)
  },
  has(_, prop) {
    const instance = filter.value
    return !!instance && prop in instance
  },
  ownKeys(_) {
    const instance = filter.value
    return instance ? Reflect.ownKeys(instance) : []
  },
  getOwnPropertyDescriptor(_, prop) {
    const instance = filter.value
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

defineExpose(new Proxy({} as IFMFilter, handler))
</script>

<template>
  <div ref="wrapperRef" style="width:100%;height:100%;">  </div>
</template>
