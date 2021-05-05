import { Router } from '~core/routes/Router'
import { DashboardPage, ExcelPage } from '~/pages'
import './styles/index.scss'


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
