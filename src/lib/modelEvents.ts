import mitt from 'mitt'

export interface ModelPropertyChangeEvent<T = unknown> {
  model: string
  property: string
  value: T
  previous: T | undefined
  target: object
}

export type ModelEventMap = {
  'model:change': ModelPropertyChangeEvent
} & Record<string, ModelPropertyChangeEvent>

export const modelEvents = mitt<ModelEventMap>()

// export const modelChangeEvent = 'model:change'

export const modelPropertyEvent = (model: string, property: string) => `${model}:${property}`

type Constructor<T = object> = new (...args: any[]) => T

interface AttachOptions<T extends Constructor> {
  model: string
  props: readonly (keyof InstanceType<T> & string)[]
}

const storageKeyMap = new WeakMap<object, Map<string, symbol>>()

const getStorageKey = (prototype: object, property: string) => {
  let propertyMap = storageKeyMap.get(prototype)
  if (!propertyMap) {
    propertyMap = new Map()
    storageKeyMap.set(prototype, propertyMap)
  }

  let key = propertyMap.get(property)
  if (!key) {
    key = Symbol(`${String(property)}`)
    propertyMap.set(property, key)
  }

  return key
}

export function attachModelEventEmitter<T extends Constructor>(
  ctor: T,
  options: AttachOptions<T>,
) {
  const { model, props } = options
  const prototype = ctor.prototype

  props.forEach((property) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, property)

    if (descriptor && !descriptor.configurable) {
      return
    }

    const storageKey = getStorageKey(prototype, property)

    Object.defineProperty(prototype, property, {
      configurable: true,
      enumerable: true,
      get(this: Record<symbol, unknown>) {
        return this[storageKey]
      },
      set(this: Record<symbol, unknown>, value: unknown) {
        const previous = this[storageKey]

        if (Object.is(previous, value)) {
          this[storageKey] = value
          return
        }

        this[storageKey] = value

        const payload: ModelPropertyChangeEvent = {
          model,
          property,
          value,
          previous,
          target: this,
        }

        // modelEvents.emit(modelChangeEvent, payload)
        modelEvents.emit(model, payload)
        modelEvents.emit(modelPropertyEvent(model, property), payload)
      },
    })
  })
}

