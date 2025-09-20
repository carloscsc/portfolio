"use client"

import { useEffect, useRef } from "react"

type Options = {
  wheel?: boolean
  drag?: boolean
  threshold?: number
}

export function useHorizontalScroll(options: Options = { wheel: true, drag: true, threshold: 5 }) {
  const { wheel = true, drag = true, threshold = 5 } = options
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let dragging = false
    let justDragged = false
    let startX = 0
    let startScrollLeft = 0

    const canScroll = () => el.scrollWidth > el.clientWidth

    // Permite gesto vertical no touch e previne conflitos
    const previousTouchAction = el.style.touchAction
    el.style.touchAction = "pan-y"

    const setCursor = () => {
      el.style.cursor = drag && canScroll() ? "grab" : ""
    }
    setCursor()

    const onWheel = (e: WheelEvent) => {
      if (!wheel) return
      if (!canScroll()) return
      // Se já for horizontal ou houver zoom, deixa o browser decidir
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      e.preventDefault()
      el.scrollBy({ left: e.deltaY, behavior: "auto" })
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!drag || !canScroll()) return
      isDown = true
      dragging = false
      justDragged = false
      startX = e.clientX
      startScrollLeft = el.scrollLeft
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!drag || !isDown) return
      const dx = e.clientX - startX

      // Só inicia drag após passar do threshold
      if (!dragging && Math.abs(dx) > threshold) {
        dragging = true
        try {
          el.setPointerCapture?.(e.pointerId)
        } catch {}
        el.style.cursor = "grabbing"
        el.style.userSelect = "none"
      }

      if (dragging) {
        el.scrollLeft = startScrollLeft - dx
      }
    }

    const endDrag = (e: PointerEvent) => {
      if (!drag) return
      if (dragging) {
        // Sinaliza que houve arraste para bloquear o próximo click
        justDragged = true
        try {
          el.releasePointerCapture?.(e.pointerId)
        } catch {}
      }
      isDown = false
      dragging = false
      el.style.userSelect = ""
      setCursor()
    }

    // Bloqueia o click se o último gesto foi arraste
    const onClickCapture = (e: MouseEvent) => {
      if (justDragged) {
        e.preventDefault()
        e.stopPropagation()
        justDragged = false
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    el.addEventListener("pointerup", endDrag)
    el.addEventListener("pointercancel", endDrag)
    el.addEventListener("pointerleave", endDrag)
    el.addEventListener("click", onClickCapture, true)

    return () => {
      el.removeEventListener("wheel", onWheel as EventListener)
      el.removeEventListener("pointerdown", onPointerDown as EventListener)
      el.removeEventListener("pointermove", onPointerMove as EventListener)
      el.removeEventListener("pointerup", endDrag as EventListener)
      el.removeEventListener("pointercancel", endDrag as EventListener)
      el.removeEventListener("pointerleave", endDrag as EventListener)
      el.removeEventListener("click", onClickCapture as EventListener, true)
      el.style.cursor = ""
      el.style.userSelect = ""
      el.style.touchAction = previousTouchAction
    }
  }, [wheel, drag, threshold])

  return ref
}
