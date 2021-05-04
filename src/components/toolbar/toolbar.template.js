const BOLD = '700'
const DECORATION = 'underline solid rgb(0, 0, 0)'
const ALIGN = 'start'

export function createToolbar(state) {
  const { fontWeight, fontStyle, textDecoration, textAlign } = state

  const buttons = [
    {
      icon: 'format_bold',
      isActive: fontWeight === BOLD,
      value:
        { fontWeight: fontWeight === BOLD ? 'normal' : BOLD },
    },
    {
      icon: 'format_italic',
      isActive: fontStyle === 'italic',
      value:
        { fontStyle: fontStyle === 'italic' ? 'normal' : 'italic' },
    },
    {
      icon: 'format_underlined',
      isActive: textDecoration === DECORATION,
      value:
        { textDecoration: textDecoration === DECORATION ? 'none' : DECORATION },
    },
    {
      icon: 'format_align_left',
      isActive: textAlign === ALIGN,
      value:
        { textAlign: ALIGN },
    },
    {
      icon: 'format_align_center',
      isActive: textAlign === 'center',
      value:
        { textAlign: 'center' },
    },
    {
      icon: 'format_align_right',
      isActive: textAlign === 'right',
      value:
        { textAlign: 'right' },
    },
  ]

  return buttons.map(toButton).join('')
}

function toButton(button) {
  const { icon, isActive, value } = button

  return `
    <div
      class="button ${isActive ? 'active': ''}"
      data-type="button"
      data-value='${JSON.stringify(value)}'
    >
      <i class="material-icons">${icon}</i>
    </div>
  `
}
