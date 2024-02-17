# @m9ch/make-class-singleton

[![npm version](https://badgen.net/npm/v/@m9ch/make-class-singleton)](https://npm.im/@m9ch/make-class-singleton) [![npm downloads](https://badgen.net/npm/dm/@m9ch/make-class-singleton)](https://npm.im/@m9ch/make-class-singleton)

## Install

via `pnpm`, `yarn` or `npm`:

```bash
pnpm add @m9ch/make-class-singleton
# or
yarn add @m9ch/make-class-singleton
# or
npm i -S @m9ch/make-class-singleton
```

## Usage

### Use as factory function:

```ts
import { Singleton as makeSingleton } from '@m9ch/make-class-singleton'

class Foo {}

const Singleton = makeSingleton(Foo)

const foo = new Singleton()
const bar = new Singleton()
console.log(foo === bar) // true
```

### Use as `ClassDecorator`

> [!NOTE]
> If using [`TypeScript`](https://www.typescriptlang.org/), you might need to enable `compilerOptions.experimentalDecorators` in `tsconfig.json` or something like that.
>
> Here is an example:
> ```json
> {
>   "compilerOptions": {
>     "target": "esnext",
>     "module": "esnext",
>     "modeResolution": "node",
>     "experimentalDecorators": true
>   }
> }
> ```

```ts
import { Singleton } from '@m9ch/make-class-singleton'

@Singleton
class Foo {}

const foo = new Foo()
const bar = new Foo()
console.log(foo === bar) // true
```

## Options

- `container`: Where singleton instance should create and stored, default is a `WeakMap` object in this module.

> [!Note]
> It might be unsafe if using default instance container in multi-thread environment, such as nodejs in swarm mode, or `WebWorker`.
>
> By passing a thread shared `WeakMap` object may save (not verified).

## License

MIT &copy; [Mitscherlich](https://mitscherlich.me)
