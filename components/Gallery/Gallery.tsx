// components/Gallery.tsx
import styles from './Gallery.module.css'

type Item = { title: string; image: string; description: string }

/** ⬇️ Экспортируем общий массив, чтобы переиспользовать на главной */
export const GALLERY_ITEMS: Item[] = [
  {
    title: 'Зеркало на входной двери',
    image: '/assets/3.webp',
    description:
      'С таким зеркалом входная дверь сразу задаёт тон всему дому — стильно, просторно и с изюминкой.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/11.webp',
    description:
      'Теперь каждый взгляд в зеркало перед выходом — маленький ритуал, который хочется повторять.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/14.webp',
    description:
      'Уют начинается ещё до того, как вы переступите порог. Мы сделали так, чтобы дверь встречала вас с отражением.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/6.jpg',
    description:
      'Простое решение, которое сразу делает прихожую больше и светлее — и да, это работает.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/7.jpg',
    description:
      'Каждая деталь здесь на своём месте. Зеркало — как финальный штрих к продуманному входу.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/8.jpg',
    description: 'Один такой штрих — и обычная дверь превращается в дизайнерский элемент.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/12.jpg',
    description: 'Отражение, которое встречает и провожает — и всегда в лучшем свете.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/13.jpg',
    description:
      'Выглядит как деталь интерьера, хотя это просто входная дверь. Но с зеркалом она — уже что-то большее.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/15.jpeg',
    description: 'Тут всё просто: стиль, удобство и ощущение, что о доме заботятся.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/16.jpg',
    description: 'Солнечный свет, простор и отражение — всё это начинается прямо с двери.',
  },
  {
    title: 'Зеркало на входной двери',
    image: '/assets/17.jpg',
    description: 'То самое ощущение, когда заходишь домой — и сразу понимаешь: здесь есть вкус.',
  },
]

// Оригинальная галерея — но стили теперь локальные
export default function Gallery() {
  return (
    <div className='grid'>
      {GALLERY_ITEMS.map((it, idx) => (
        <figure key={idx} className={`card ${styles.item}`}>
          <img className={styles.image} src={it.image} alt={it.title} />
          <figcaption className={styles.caption}>
            <div className={`${styles.description} title-font`}>{it.description}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
