import Mock from 'mockjs'

interface IMockArray {
  length: number,
  min?: number,
  max?: number,
  isInt?: boolean
}

function getRandom(min: number, max: number, isInt: boolean = false): number {
  return isInt
    ? Math.floor(Math.random() * (max - min) + min)
    : Math.random() * (max - min) + min
}
export function mockArray({ length, min = 0, max = 100, isInt }: IMockArray): number[] {
  length = Math.abs(~~length);
  if (!length) return [];
  const result = []
  for (let i = 0; i < length; i++) {
    result.push(getRandom(min, max, isInt))
  }
  return result;
}