export function Binder(_: any, _2: string, desc: PropertyDescriptor) {
  const originalM = desc.value;
  const adjDesc: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const bfn = originalM.bind(this)
      return bfn
    }
  }
  return adjDesc;
}
