import { $ } from '../Dom'
import { ActiveRoute } from '../routes/ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('No selector provided to Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    this.page = null

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }

    const Page = ActiveRoute.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)

    this.$placeholder.clear().append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
