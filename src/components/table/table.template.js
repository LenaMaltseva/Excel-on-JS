const CHAR_CODES = {
  A: 65,
  Z: 90,
}

export function createTable(rowsCount = 10) {
  const rows = []

  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}

function toColumn(content, index) {
  return `<div class="column" data-type="resizable" data-column="${index}">
    ${content}
    <div class="column__resize" data-resize="column"></div>
  </div>`
}

function toCell(_, index) {
  return `<div class="cell" data-column="${index}" contenteditable></div>`
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
