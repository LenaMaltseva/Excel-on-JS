import { $ } from '~core/Dom'
import { ExcelComponent } from '~core/ExcelComponent'
import * as actions from '~/redux/actions'
import { parse } from '~core/parse'
import { defaultStyles } from '~/constants'
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
    return createTable(30, this.store.getState())
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      if (value) {
        this.selection.current
            .attr('data-value', value)
            .text(parse(value))
        this.updateTextInStore(value)
      }
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds,
      }))
    })

    this.$on('tableTitle:input', () => {
      this.selection.current.blur()
      this.selection.clear()
    })

    this.$on('tableTitle:done', () => {
      this.selection.current.focus()
      this.selection.select(this.selection.current)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(e) {
    try {
      const data = await handleResize(e, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (err) {
      console.warn('Resize table went wrong:', err)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.textChange({
      id: this.selection.current.id(),
      value,
    }))
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)

      if (isMultiSelect(e)) {
        const $current = this.selection.current
        const $cells = getMatrix($current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
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
    this.updateTextInStore($(e.target).text())
  }
}
