export default function MetrikaInformer() {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  const id = process.env.NEXT_PUBLIC_YM_ID
  return (
    <a
      href={`https://metrika.yandex.ru/stat/?id=${id}&from=informer`}
      target='_blank'
      rel='nofollow noopener noreferrer'
    >
      <img
        src={`https://metrika-informer.com/informer/106546567/3_0_DEDEDEFF_DEDEDEFF_0_pageviews`}
        style={{
          width: '88px',
          height: '31px',
        }}
        alt='Яндекс.Метрика'
      />
    </a>
  )
}
