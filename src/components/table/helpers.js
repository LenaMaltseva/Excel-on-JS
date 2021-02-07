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

export function getMatrix($current, $target) {
  const current = $current.id(true)
  const target = $target.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function isKeyBoardNav(evt) {
  const keys = [
    'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter', 'Tab',
  ]
  return keys.includes(evt.key)
}

export function getNextSelector(evt, { row, col }) {
  const MIN_VALUE = 0
  switch (evt.key) {
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? col : col - 1
      break

    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? row : row - 1
      break

    case 'ArrowDown':
    case 'Enter':
      row++
      break

    case 'ArrowRight':
    case 'Tab':
      col++
      break
  }

  return `[data-id="${row}:${col}"]`
}
