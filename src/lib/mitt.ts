import mitt from "mitt";

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

export const modelChangeEvent = 'model:change'
export const modelPropertyEvent = (model: string, property: string): `mod_${string}` => `mod_${model}:prop_${property}`
export const modelCustomEvent = (model: string, event: string): `mod_${string}` => `mod_${model}:evt_${event}`
export const modelInstanceEvent = (model: string, instanceId: string): `mod_${string}` => `mod_${model}#id_${instanceId}`
export const modelInstancePropertyEvent = (
  model: string,
  property: string,
  instanceId: string,
): `mod_${string}` => `mod_${model}:prop_${property}#id_${instanceId}`
export const modelInstanceCustomEvent = (
  model: string,
  event: string,
  instanceId: string,
): `mod_${string}` => `mod_${model}:evt_${event}#id_${instanceId}`
export const userEvent = (event: string): `usr_${string}` => `usr_evt_${event}`
export const userEventAction = (event: string, action: string): `usr_${string}` => `usr_evt_${event}_act_${action}`

export type ModelEventMap = {
  // specific one if you want to give it a name
  "model:change": ModelPropertyChangeEvent
} & {
  // all events starting with "mod_"
  [K in `mod_${string}`]: ModelPropertyChangeEvent
} & {
  // all events starting with "usr_"
  [K in `usr_${string}`]: UserEventMap
}

export const modelEvents = mitt<ModelEventMap>()
