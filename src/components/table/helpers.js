import { range } from '~core/utils'

export function shouldResize(evt) {
  return Boolean(evt.target.dataset.resize)
}

export function isCell(evt) {
  return evt.target.dataset.type === 'cell'
}

export function isMultiSelect(evt) {
  return evt.shiftKey
}

export function matrix($current, $target) {
  const current = $current.id(true)
  const target = $target.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
