import { $ } from '~core/Dom'
import { ExcelComponent } from '~core/ExcelComponent'
import { createTable } from './table.template'
import {
  shouldResize,
  isCell,
  isMultiSelect,
  getMatrix,
  isKeyBoardNav,
  getNextSelector,
} from './helpers'
import { handleResize } from './table.resize'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(30)
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(e, this.$root)
    } else if (isCell(e)) {
      const $target = $(e.target)

      if (isMultiSelect(e)) {
        const $current = this.selection.current
        const $cells = getMatrix($current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(e) {
    if (isKeyBoardNav(e) && !e.shiftKey) {
      e.preventDefault()

      const currentId = $(e.target).id(true)
      const $next = this.$root.find(getNextSelector(e, currentId))
      this.selectCell($next)
    }
  }

  onInput(e) {
    this.$emit('table:input', $(e.target).text())
  }
}
