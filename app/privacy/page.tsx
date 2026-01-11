export const metadata = {
  title: 'Политика конфиденциальности — REFLA',
}

export default function PrivacyPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='glass-card p-7 md:p-10'>
          <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Политика конфиденциальности</h1>
          <p className='mt-4 text-base-content/70'>
            На сайте используется форма заявки. Мы обрабатываем только те данные, которые вы вводите самостоятельно: имя,
            контакт и адрес/район, а также комментарий (если добавили).
          </p>

          <div className='mt-8 space-y-4 text-sm text-base-content/70'>
            <div>
              <div className='font-semibold text-base-content'>Цель обработки</div>
              <p className='mt-1'>
                Связаться с вами, уточнить детали заказа и подготовить расчёт стоимости/сроков.
              </p>
            </div>
            <div>
              <div className='font-semibold text-base-content'>Хранение</div>
              <p className='mt-1'>Данные хранятся только на время, необходимое для обработки заявки и коммуникации.</p>
            </div>
            <div>
              <div className='font-semibold text-base-content'>Передача третьим лицам</div>
              <p className='mt-1'>Мы не продаём и не передаём данные третьим лицам, кроме технических способов доставки сообщения.</p>
            </div>
            <div>
              <div className='font-semibold text-base-content'>Контакты</div>
              <p className='mt-1'>Если хотите удалить данные — напишите нам любым способом на странице «Контакты».</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
