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

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
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

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
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
      const $target = this.$root.find(getNextSelector(e, currentId))

      this.selection.select($target)
    }
  }
}
