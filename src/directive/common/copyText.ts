/**
* v-copyText 复制文本内容
* Copyright (c) 2022 ruoyi
*/
export default {
  beforeMount(el: HTMLElement, { value, arg }: DirectiveBinding) {
    if (arg === "callback") {
      (el as any).$copyCallback = value
    } else {
      (el as any).$copyValue = value
      const handler = () => {
        copyTextToClipboard((el as any).$copyValue)
        if ((el as any).$copyCallback) {
          (el as any).$copyCallback((el as any).$copyValue)
        }
      }
      el.addEventListener("click", handler)
      ;(el as any).$destroyCopy = () => el.removeEventListener("click", handler)
    }
  }
}

function copyTextToClipboard(input: string, { target = document.body }: { target?: HTMLElement } = {}): boolean {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement as HTMLElement

  element.value = input

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '')

  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  const originalRange = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  target.append(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch { }

  element.remove()

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }

  return isSuccess
}
