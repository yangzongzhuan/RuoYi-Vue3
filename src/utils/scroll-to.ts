declare global {
  interface Math {
    easeInOutQuad(t: number, b: number, c: number, d: number): number
  }
}

Math.easeInOutQuad = function(t: number, b: number, c: number, d: number): number {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
const requestAnimFrame = (function() {
  return window.requestAnimationFrame || (window as any).webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame || function(callback: FrameRequestCallback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param amount
 */
function move(amount: number): void {
  document.documentElement.scrollTop = amount
  ;(document.body.parentNode as HTMLElement).scrollTop = amount
  document.body.scrollTop = amount
}

function position(): number {
  return document.documentElement.scrollTop || (document.body.parentNode as HTMLElement).scrollTop || document.body.scrollTop
}

/**
 * @param to
 * @param duration
 * @param callback
 */
export function scrollTo(to: number, duration?: number, callback?: () => void): void {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  const animateScroll = function() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = Math.easeInOutQuad(currentTime, start, change, duration!)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}
