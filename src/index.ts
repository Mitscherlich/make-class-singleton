import { globalThis } from '@m9ch/global-this'

const supportProxy = (() => {
  const nativeProxy = globalThis.Proxy
  const nativeReflect = globalThis.Reflect
  return typeof nativeProxy === 'function' && typeof nativeReflect === 'object' && nativeReflect != null
})()

export interface Options {
  container?: WeakMap<any, any>
}

export function Singleton<TFunction extends Function>(target: TFunction, options?: Options): TFunction
export function Singleton<TFunction extends Function>(options?: Options): (target: TFunction) => TFunction

export function Singleton<TFunction extends Function>(target?: Options | TFunction, options?: Options) {
  if (typeof target === 'function')
    return singletonFactory(target, options)

  return (Ctor: TFunction) => singletonFactory(Ctor, target)
}

const defaultContainer = new WeakMap<any, any>()
function singletonFactory<TFunction extends Function>(target: TFunction, options?: Options) {
  const finalOpts: Options = {
    container: defaultContainer,
    ...options,
  }
  return supportProxy ? makeSingletonProxy(target, finalOpts) : makeSingletonClassic(target, finalOpts)
}

function makeSingletonClassic<TFunction extends Function>(target: TFunction, options: Options): TFunction {
  const instanceContainer = options.container || defaultContainer
  const Ctor: any = target
  class Wrapped extends Ctor {
    constructor(...args: any[]) {
      if (instanceContainer.has(Wrapped))
        return instanceContainer.get(Wrapped)

      super(...args)
      instanceContainer.set(Wrapped, this)
    }
  }
  // TODO: better typings
  return Wrapped as unknown as TFunction
}

function makeSingletonProxy<TFunction extends Function>(target: TFunction, options: Options) {
  const instanceContainer = options.container || defaultContainer
  const proxy = new Proxy(target, {
    construct(target, args, newTarget) {
      if (instanceContainer.has(newTarget))
        return instanceContainer.get(newTarget)

      const instance = Reflect.construct(target, args, newTarget)
      instanceContainer.set(newTarget, instance)
      return instance
    },
  })
  return proxy
}
