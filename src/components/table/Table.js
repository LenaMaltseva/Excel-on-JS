import { $ } from '~core/Dom'
import { ExcelComponent } from '~core/ExcelComponent'
import { createTable } from '~/components/table/table.template'
import {
  shouldResize,
  isCell,
  isMultiSelect,
  matrix,
} from '~/components/table/helpers'
import { handleResize } from '~/components/table/table.resize'
import { TableSelection } from '~/components/table/TableSelection'

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
    $cell.focus()
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(e, this.$root)
    } else if (isCell(e)) {
      const $target = $(e.target)

      if (isMultiSelect(e)) {
        const $current = this.selection.current
        const $cells = matrix($current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
}
