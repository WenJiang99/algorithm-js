export default abstract class AbstractSolver<T>{
  abstract put: (key: string, value: T) => any
  abstract get: (key: string) => T
  abstract remove: (key: string) => boolean
  abstract has: (key: string) => boolean
  abstract showAll: () => void
  abstract length: () => number
}
