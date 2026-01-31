import Gallery from 'components/Gallery/Gallery'

export const metadata = {
  title: 'Примеры — REFLA',
}

export default function ExamplesPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='flex items-end justify-between gap-6 flex-wrap'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Примеры работ</h1>
            <p className='mt-3 text-base-content/70'>
              Несколько фото установок. Нажмите, чтобы увеличить.
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <Gallery />
        </div>
      </div>
    </section>
  )
}
