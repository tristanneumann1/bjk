import mitt from "mitt";

export interface ModelPropertyChangeEvent<T = unknown> {
  model: string
  instanceId?: string
  property: string
  value: T
  previous: T | undefined
  target: object
}

export const modelChangeEvent = 'model:change'
export const modelPropertyEvent = (model: string, property: string) => `${model}:${property}`
export const modelInstanceEvent = (model: string, instanceId: string) => `${model}#${instanceId}`
export const modelInstancePropertyEvent = (
  model: string,
  property: string,
  instanceId: string,
) => `${model}:${property}#${instanceId}`

export type ModelEventMap = {
  'model:change': ModelPropertyChangeEvent
} & Record<string, ModelPropertyChangeEvent>

export const modelEvents = mitt<ModelEventMap>()
