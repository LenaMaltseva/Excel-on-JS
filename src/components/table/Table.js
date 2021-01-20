import { ExcelComponent } from '~core/ExcelComponent'
import { createTable } from '~/components/table/table.template'
import { shouldResize } from '~/components/table/helpers'
import { handleResize } from '~/components/table/table.resize'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(30)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      handleResize(e, this.$root)
    }
  }
}
