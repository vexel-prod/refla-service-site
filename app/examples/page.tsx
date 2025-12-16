import dynamic from 'next/dynamic'

// Динамический импорт галереи (чтобы SSR был включён)
const Gallery = dynamic(() => import('components/Gallery/Gallery'), { ssr: true })

// Страница "Примеры наших работ"
export default function Examples() {
  return (
    <section>
      {/* Заголовок страницы */}
      <h1 className='examples__title'>Примеры наших работ</h1>

      {/* Компонент галереи */}
      <Gallery />
    </section>
  )
}
