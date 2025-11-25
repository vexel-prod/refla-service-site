'use client'

import * as React from 'react'
import styles from './TypingText.module.css'

type TypingTextProps = {
  text: string
  className?: string
  speed?: number // мс на символ, по умолчанию ~30–40
}

export default function TypingText({ text, className = '', speed = 65 }: TypingTextProps) {
  const [visible, setVisible] = React.useState('')

  React.useEffect(() => {
    let i = 0
    setVisible('')

    const id = window.setInterval(() => {
      i += 1
      setVisible(text.slice(0, i))

      if (i >= text.length) {
        window.clearInterval(id)
      }
    }, speed)

    return () => window.clearInterval(id)
  }, [text, speed])

  return (
    <p className={`${className} ${styles.typing}`}>
      {visible}
      <span className={styles.cursor} >-</span>
    </p>
  )
}
