// components/QuoteLeadForm.client.tsx
'use client'
import dynamic from 'next/dynamic'

const QuoteLeadForm = dynamic(() => import('components/QuoteLeadForm/QuoteLeadForm'), {
  ssr: false, // 👈 форма рендерится только на клиенте
})

export default QuoteLeadForm
