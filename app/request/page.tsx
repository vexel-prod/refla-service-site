import LeadForm from 'components/LeadForm/LeadForm'

export const metadata = {
  title: 'Заявка — REFLA',
}

export default function RequestPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='grid gap-8 lg:grid-cols-2 lg:items-start'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Рассчитать стоимость</h1>
            <p className='mt-3 text-base-content/70'>
              Напишите, что хотите получить (размер, кромка, вырезы под фурнитуру) — мы предложим варианты и пришлём
              смету.
            </p>

            <div className='mt-6 card-surface gradient-border p-6'>
              <div className='text-sm font-semibold'>Что полезно указать</div>
              <ul className='mt-3 space-y-2 text-sm text-base-content/70 list-disc pl-5'>
                <li>Адрес / район и удобное время</li>
                <li>Фото двери (если есть)</li>
                <li>Нужен ли вырез под ручку/замок</li>
                <li>Предпочтения по кромке: полировка / фацет</li>
              </ul>
            </div>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  )
}
