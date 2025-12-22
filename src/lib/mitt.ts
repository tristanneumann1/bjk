import mitt from "mitt";

export type ModelChangeEvent = `model:change`
export type ModelEvent = `mod_${string}`
export type UserEvent = `usr_${string}`

export interface UserEventMap<T = unknown> {
  event: string,
  // TODO action and value are same, make instance id tracking or something
  action?: string,
  value?: T
}

export interface ModelPropertyChangeEvent<T = unknown> {
  model: string
  instanceId?: string
  property?: string
  event?: string
  value: T
  previous: T | undefined
  target: object
}

export const modelChangeEvent: ModelChangeEvent = 'model:change'
export const modelPropertyEvent = (model: string, property: string): ModelEvent => `mod_${model}:prop_${property}`
export const modelCustomEvent = (model: string, event: string): ModelEvent => `mod_${model}:evt_${event}`
export const modelInstanceEvent = (model: string, instanceId: string): ModelEvent => `mod_${model}#id_${instanceId}`
export const modelInstancePropertyEvent = (
  model: string,
  property: string,
  instanceId: string,
): ModelEvent => `mod_${model}:prop_${property}#id_${instanceId}`
export const modelInstanceCustomEvent = (
  model: string,
  event: string,
  instanceId: string,
): ModelEvent => `mod_${model}:evt_${event}#id_${instanceId}`
export const userEvent = (event: string): UserEvent => `usr_evt_${event}`
export const userEventAction = (event: string, action: string): UserEvent => `usr_evt_${event}_act_${action}`

export type ModelEventMap = {
  // specific one if you want to give it a name
  [K in ModelChangeEvent]: ModelPropertyChangeEvent
} & {
  // all events starting with "mod_"
  [K in ModelEvent]: ModelPropertyChangeEvent
} & {
  // all events starting with "usr_"
  [K in UserEvent]: UserEventMap
}

export const modelEvents = mitt<ModelEventMap>()
