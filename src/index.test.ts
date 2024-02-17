import { Singleton } from './index'

describe('Singleton', () => {
  it('should exist and be a function', () => {
    expect(Singleton).to.be.exist
    expect(typeof Singleton).toBe('function')
  })

  describe('should called as a function and take 1-2 argument(s)', () => {
    it('wrap target class with default options', () => {
      class Test {}
      const Wrapped = Singleton(Test)
      const t1 = new Wrapped()
      const t2 = new Wrapped()
      expect(t1 === t2).toBe(true)
    })

    it('wrap target class with custom options', () => {
      const container = new WeakMap()
      class Test {}
      const Wrapped = Singleton(Test, { container })
      const t1 = new Wrapped()
      const t2 = new Wrapped()
      expect(t1 === t2).toBe(true)
      expect(container.has(Wrapped))
      expect(container.get(Wrapped) === t1).toBe(true)
      expect(container.get(Wrapped) === t2).toBe(true)
    })
  })

  describe('should called as a decorater and take 0-1 argument', () => {
    it('with default options', () => {
      @Singleton class Test {}
      const t1 = new Test()
      const t2 = new Test()
      expect(t1 === t2).toBe(true)
    })

    it('with custom options', () => {
      const container = new WeakMap()
      @Singleton({ container }) class Test {}
      const t1 = new Test()
      const t2 = new Test()
      expect(t1 === t2).toBe(true)
      expect(container.has(Test))
      expect(container.get(Test) === t1).toBe(true)
      expect(container.get(Test) === t2).toBe(true)
    })
  })
})
