import type { ComputedRef, InjectionKey } from 'vue'
import type { StateInputParams } from '@flexmonster/js'

/**
 * Carries the state shared by an <FMGroup> to every Flexmonster component
 * rendered inside it, no matter how deeply it is nested.
 */
export const FMStateContext: InjectionKey<ComputedRef<StateInputParams | undefined>> =
  Symbol('FMStateContext')
