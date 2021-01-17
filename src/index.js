import './styles/index.scss'
import { Excel, Header, Toolbar, Formula, Table } from '~/components'

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

excel.render()
