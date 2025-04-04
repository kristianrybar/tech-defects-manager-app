import { useEffect } from 'react'

export const usePreventBodyScroll = (shouldPreventScroll: boolean) => {
  useEffect(() => {
    if (!shouldPreventScroll) {
      return
    } 

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [shouldPreventScroll])
}