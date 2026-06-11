<script lang="ts">
import { defineComponent, cloneVNode, h, Fragment, type VNode } from 'vue'
import type { StateInputParams } from '@flexmonster/js'

export default defineComponent({
  name: 'FMGroup',
  props: {
    state: {
      type: Object as () => StateInputParams | undefined,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    // Inject `state` into every slotted child vnode (recursing through
    // fragments), so child components like FMToolbar/FMFlatTable receive it
    // via their own `props.state` — without modifying those components.
    // A child that already declares its own `state` keeps it.
    const inject = (nodes: VNode[]): VNode[] =>
      nodes.map((vnode) => {
        if (vnode.type === Fragment && Array.isArray(vnode.children)) {
          return h(Fragment, vnode.props, inject(vnode.children as VNode[]))
        }
        if (props.state && !(vnode.props && 'state' in vnode.props)) {
          return cloneVNode(vnode, { state: props.state })
        }
        return vnode
      })

    return () => h('div', inject(slots.default?.() ?? []))
  },
})
</script>
