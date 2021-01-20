import { $ } from '~core/Dom'

export function handleResize(e, $root) {
  const { resize } = e.target.dataset
  const $resizer = $(e.target)
  const side = resize === 'row' ? 'bottom' : 'right'
  $resizer.css({ opacity: 1, [side]: '-5000px' })

  const $parent = $resizer.closest('[data-type="resizable"]')
  const { width, height, right, bottom } = $parent.getCoords()
  const parentParams = {
    end: resize === 'row' ? bottom : right,
    size: resize === 'row' ? height : width,
  }

  let newSize

  document.onmousemove = evt => {
    const mousePoint = resize === 'row' ? evt.pageY : evt.pageX
    const deltaSize = mousePoint - parentParams.end
    newSize = parentParams.size + deltaSize

    $resizer.css({ [side]: -deltaSize + 'px' })
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $resizer.css({ opacity: 0, right: 0, bottom: 0 })

    if (resize === 'row') {
      $parent.css({ height: newSize + 'px' })
    } else {
      $root.findAll(`[data-column="${$parent.data.column}"]`)
          .forEach(cell => {
            $(cell).css({ width: newSize + 'px' })
          })
    }
  }
}
