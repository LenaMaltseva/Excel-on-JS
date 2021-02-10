import { TABLE_RESIZE, TEXT_CHANGE } from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function textChange(data) {
  return {
    type: TEXT_CHANGE,
    data,
  }
}
