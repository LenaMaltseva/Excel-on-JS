import { Page } from '~core/page/Page'
import { StateProcessor } from '~core/page/StateProcessor'
import { LocalStorageClient } from '~/shared/LocalStorageClient'
import { Excel, Formula, Header, Table, Toolbar } from '~/components'
import { createStore } from '~core/store/createStore'
import { rootReducer, initialState } from '~/redux'

export class ExcelPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const state = await this.processor.get()

    const store =
      createStore(rootReducer, state || { ...initialState })

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
