import styles from './page.module.css'
import TiltCard from 'components/TiltCard/TiltCard'

export default function Privacy() {
  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className='topSection'>
        <h1 className='page-title'>Политика конфиденциальности</h1>
        <p className={styles.lead}>
          Настоящая Политика конфиденциальности разработана в соответствии с Федеральным законом
          №152-ФЗ «О персональных данных» и регулирует порядок обработки данных пользователями сайта
          refla.ru.
        </p>
      </section>

      <div className={styles.grid}>
        {/* 1 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>1. Общие положения</h2>
          <p className={styles.text}>
            Оператором персональных данных является сайт refla.ru. Используя сайт, вы выражаете
            согласие с настоящей Политикой.
          </p>
          <p className={styles.text}>
            Персональные данные обрабатываются в соответствии с Конституцией РФ, ГК РФ, Федеральным
            законом №152-ФЗ и иными нормативными актами.
          </p>
        </TiltCard>

        {/* 2 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>2. Состав обрабатываемых данных</h2>
          <ul className={styles.list}>
            <li>ФИО;</li>
            <li>номер телефона;</li>
            <li>адрес электронной почты;</li>
            <li>адрес установки (при оформлении заявки);</li>
            <li>прилагаемые фото/описания работ;</li>
            <li>данные об устройстве: IP-адрес, cookies, сведения о браузере;</li>
            <li>технические логи для защиты от спама/взлома.</li>
          </ul>
        </TiltCard>

        {/* 3 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>3. Цели обработки данных</h2>
          <ul className={styles.list}>
            <li>обработка заявок и связь с клиентами;</li>
            <li>расчёт стоимости работ и заключение договоров;</li>
            <li>информирование о статусе заявки или монтажа;</li>
            <li>улучшение качества сервиса и статистическая аналитика;</li>
            <li>обеспечение технической поддержки сайта;</li>
            <li>выполнение требований законодательства.</li>
          </ul>
        </TiltCard>

        {/* 4 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>4. Правовые основания обработки</h2>
          <p className={styles.text}>Обработка осуществляется на основании:</p>
          <ul className={styles.list}>
            <li>ст. 6 Федерального закона №152-ФЗ;</li>
            <li>согласия субъекта персональных данных;</li>
            <li>исполнения договора или подготовительных действий к нему;</li>
            <li>законных интересов оператора.</li>
          </ul>
        </TiltCard>

        {/* 5 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>5. Передача данных третьим лицам</h2>
          <p className={styles.text}>
            Мы не передаем персональные данные третьим лицам, за исключением:
          </p>
          <ul className={styles.list}>
            <li>случаев, предусмотренных законодательством;</li>
            <li>передачи сообщений в Telegram при оформлении заявки;</li>
            <li>технических подрядчиков (хостинг, анти-спам), соблюдающих 152-ФЗ.</li>
          </ul>
        </TiltCard>

        {/* 6 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>6. Cookies и аналитика</h2>
          <p className={styles.text}>
            Сайт может использовать cookies для корректной работы, аналитики посещаемости и защиты
            от автоматизированного спама.
          </p>
        </TiltCard>

        {/* 7 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>7. Сроки хранения</h2>
          <p className={styles.text}>
            Данные хранятся до достижения целей обработки либо до момента отзыва согласия.
            Технические журналы событий — до 12 месяцев.
          </p>
        </TiltCard>

        {/* 8 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>8. Права пользователя</h2>
          <ul className={styles.list}>
            <li>получать информацию об обработке данных;</li>
            <li>требовать уточнения, блокировки или удаления;</li>
            <li>отозвать согласие;</li>
            <li>подать обращение оператору;</li>
            <li>обратиться в Роскомнадзор или в суд.</li>
          </ul>
        </TiltCard>

        {/* 9 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>9. Меры по защите данных</h2>
          <p className={styles.text}>
            Мы принимаем технические и организационные меры для предотвращения несанкционированного
            доступа, изменения и распространения данных.
          </p>
        </TiltCard>

        {/* 10 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>10. Изменение политики</h2>
          <p className={styles.text}>
            Политика может обновляться. Новая редакция вступает в силу с момента публикации на
            странице refla.ru/privacy.
          </p>
        </TiltCard>

        {/* 11 */}
        <TiltCard as='section' className={styles.block}>
          <h2 className={styles.subtitle}>11. Контакты</h2>
          <p className={styles.text}>
            Для обращений по вопросам обработки данных используйте контакты, указанные в разделе
            «Контакты» сайта.
          </p>
        </TiltCard>
      </div>
    </main>
  )
}
