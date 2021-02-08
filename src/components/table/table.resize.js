import { $ } from '~core/Dom'

export function handleResize(e, $root) {
  return new Promise(resolve => {
    const { resize: resizeType } = e.target.dataset
    const $resizer = $(e.target)
    const side = resizeType === 'row' ? 'right' : 'bottom'
    $resizer.css({ opacity: 1, [side]: '-5000px' })

    const $parent = $resizer.closest('[data-type="resizable"]')
    const { width, height, right, bottom } = $parent.getCoords()
    const parentParams = {
      end: resizeType === 'row' ? bottom : right,
      size: resizeType === 'row' ? height : width,
    }

    let newSize

    document.onmousemove = evt => {
      const mousePoint = resizeType === 'row' ? evt.pageY : evt.pageX
      const deltaSize = mousePoint - parentParams.end
      newSize = parentParams.size + deltaSize

      const side = resizeType === 'row' ? 'bottom' : 'right'
      $resizer.css({ [side]: -deltaSize + 'px' })
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      $resizer.css({ opacity: 0, right: 0, bottom: 0 })

      if (resizeType === 'row') {
        $parent.css({ height: newSize + 'px' })
      } else {
        $root.findAll(`[data-column="${$parent.data.column}"]`)
            .forEach(cell => {
              $(cell).css({ width: newSize + 'px' })
            })
      }

      resolve({
        value: newSize,
        id: resizeType === 'row' ? $parent.data.row : $parent.data.column,
      })
    }
  })
}
