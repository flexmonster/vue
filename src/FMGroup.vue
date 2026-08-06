<script setup lang="ts">
import { computed, provide } from 'vue'
import type { StateInputParams } from '@flexmonster/js'
import { FMStateContext } from './FMStateContext'

interface Props {
  state?: StateInputParams
}

const props = defineProps<Props>()

provide(FMStateContext, computed(() => props.state))
</script>

<template>
  <slot />
</template>
