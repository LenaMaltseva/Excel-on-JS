import { Page } from '~core/Page'
import { Excel, Formula, Header, Table, Toolbar } from '~/components'
import { debounce, storage } from '~core/utils'
import { createStore } from '~core/store/createStore'
import { rootReducer, initialState } from '~/redux'

export class ExcelPage extends Page {
  getRoot() {
    const excelKey =
      `excel:${this.params ? this.params : Date.now().toString()}`

    const store =
      createStore(rootReducer, storage(excelKey) || { ...initialState })

    const stateListener = debounce(state => {
      storage(excelKey, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
