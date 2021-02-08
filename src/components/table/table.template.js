const CHAR_CODES = {
  A: 65,
  Z: 90,
}

export function createTable(rowsCount = 10, state = {}) {
  const rows = []

  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state.colState))
        .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}

function withWidthFrom(state) {
  return function(content, index) {
    return { content, index, style: getWidthStyle(state, index) }
  }
}

function getWidthStyle(state, index) {
  if (!state) return ''
  return state[index] ? `style = "width: ${state[index]}px"` : ''
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}

function toColumn({ content, index, style }) {
  return `
    <div class="column" data-type="resizable" data-column="${index}" ${style}>
      ${content}
      <div class="column__resize" data-resize="column"></div>
    </div>
  `
}

function toCell(row, state) {
  return function(_, col) {
    const style = getWidthStyle(state, col)
    return `
      <div contenteditable
        class="cell"
        data-type="cell"
        data-column="${col}"
        data-id="${row}:${col}"
        ${style}
      >
      </div>
    `
  }
}

function createRow(content, index = '') {
  const resizer = index
    ? `<div class="row__resize" data-resize="row"></div>`
    : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row__info">
        ${index}
        ${resizer}
      </div>
      <div class="row__data">${content}</div>
    </div>
  `
}
