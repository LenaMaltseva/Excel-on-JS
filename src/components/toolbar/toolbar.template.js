const BOLD = '700'
const DECORATION = 'underline solid rgb(0, 0, 0)'
const ALIGN = 'start'

export function createToolbar(state) {
  const { fontWeight, fontStyle, textDecoration, textAlign } = state

  const buttons = [
    {
      title: 'Bold font',
      icon: 'format_bold',
      isActive: fontWeight === BOLD,
      value:
        { fontWeight: fontWeight === BOLD ? 'normal' : BOLD },
    },
    {
      title: 'Italic font',
      icon: 'format_italic',
      isActive: fontStyle === 'italic',
      value:
        { fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      title: 'Underlined font',
      icon: 'format_underlined',
      isActive: textDecoration === DECORATION,
      value:
        { textDecoration: textDecoration === DECORATION ? 'none' : DECORATION },
    },
    {
      title: 'Left alignment',
      icon: 'format_align_left',
      isActive: textAlign === ALIGN,
      value:
        { textAlign: ALIGN },
    },
    {
      title: 'Center alignment',
      icon: 'format_align_center',
      isActive: textAlign === 'center',
      value:
        { textAlign: 'center' },
    },
    {
      title: 'Right alignment',
      icon: 'format_align_right',
      isActive: textAlign === 'right',
      value:
        { textAlign: 'right' },
    },
  ]

  return buttons.map(toButton).join('')
}

function toButton(button) {
  const { icon, isActive, value, title } = button

  return `
    <div
      class="button ${isActive ? 'active': ''}"
      data-type="button"
      data-value='${JSON.stringify(value)}'
      title="${title}"
    >
      <i class="material-icons">${icon}</i>
    </div>
  `
}
