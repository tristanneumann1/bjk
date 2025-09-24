import mitt from "mitt";

export interface ModelPropertyChangeEvent<T = unknown> {
  model: string
  instanceId?: string
  property?: string
  event?: string
  value: T
  previous: T | undefined
  target: object
}

export const modelChangeEvent = 'model:change'
export const modelPropertyEvent = (model: string, property: string) => `mod_${model}:prop_${property}`
export const modelCustomEvent = (model: string, event: string) => `mod_${model}:evt_${event}`
export const modelInstanceEvent = (model: string, instanceId: string) => `mod_${model}#id_${instanceId}`
export const modelInstancePropertyEvent = (
  model: string,
  property: string,
  instanceId: string,
) => `mod_${model}:prop_${property}#id_${instanceId}`
export const modelInstanceCustomEvent = (
  model: string,
  event: string,
  instanceId: string,
) => `mod_${model}:evt_${event}#id_${instanceId}`

export type ModelEventMap = {
  'model:change': ModelPropertyChangeEvent
} & Record<string, ModelPropertyChangeEvent>

export const modelEvents = mitt<ModelEventMap>()
