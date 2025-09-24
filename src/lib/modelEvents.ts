import { type ModelPropertyChangeEvent, modelChangeEvent, modelPropertyEvent, modelInstanceEvent, modelInstancePropertyEvent, modelEvents } from "@/lib/mitt";

type Constructor<T = object> = new (...args: any[]) => T

interface AttachOptions<T extends Constructor> {
  model: string
  props: readonly (keyof InstanceType<T> & string)[]
  trackInstance?: boolean
}

const storageKeyMap = new WeakMap<object, Map<string, symbol>>()
const instanceCounters = new WeakMap<Constructor, number>()
const instanceIdLookup = new WeakMap<object, string>()

export const getModelInstanceId = (instance: object) => instanceIdLookup.get(instance)

export function ensureInstanceId<T extends Constructor> (ctor: T, model: string, instance: Record<string | symbol, unknown>) {
  let id = instanceIdLookup.get(instance)
    if (id) {
      return id
    }

    const nextIndex = (instanceCounters.get(ctor) ?? 0) + 1
    instanceCounters.set(ctor, nextIndex)
    id = `${model}_${nextIndex}`
    instanceIdLookup.set(instance, id)
    return id
  }

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
  const { model, props, trackInstance = false } = options
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
        const instanceId = trackInstance ? ensureInstanceId(ctor, model, this as Record<string | symbol, unknown>) : undefined

        if (Object.is(previous, value)) {
          this[storageKey] = value
          return
        }

        this[storageKey] = value

        const payload: ModelPropertyChangeEvent = {
          model,
          instanceId,
          property,
          value,
          previous,
          target: this,
        }

        modelEvents.emit(modelChangeEvent, payload)
        modelEvents.emit(model, payload)
        modelEvents.emit(modelPropertyEvent(model, property), payload)
        if (instanceId) {
          modelEvents.emit(modelInstanceEvent(model, instanceId), payload)
          modelEvents.emit(modelInstancePropertyEvent(model, property, instanceId), payload)
        }
      },
    })
  })
}
