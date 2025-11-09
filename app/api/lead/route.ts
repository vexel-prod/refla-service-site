export const runtime = 'nodejs'
import { z } from 'zod'

const LeadSchema = z.object({
	name: z.string().min(2).max(60),
	contact: z.string().min(6).max(100),
	address: z.string().min(5).max(200),
	comment: z.string().max(2000).optional().default(''),
	hp: z.string().optional().default(''),
	ft: z.number().int().optional(),
})

const MIN_FILL_MS = 1500
const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const validContact = (v: string) =>
	/^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(v) || /^[+0-9()\-\s]{6,20}$/.test(v)

export async function POST(req: Request) {
	if (!req.headers.get('content-type')?.includes('application/json')) {
		return Response.json({ ok: false, error: 'unsupported' }, { status: 415 })
	}
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return Response.json({ ok: false, error: 'bad_json' }, { status: 400 })
	}

	const p = (() => {
		try {
			return LeadSchema.parse(body)
		} catch {
			return null
		}
	})()
	if (!p || !validContact(p.contact))
		return Response.json({ ok: false, error: 'invalid' }, { status: 400 })

	if (p.hp?.trim())
		return Response.json({ ok: false, error: 'bot' }, { status: 400 })
	if (p.ft && Date.now() - p.ft < MIN_FILL_MS)
		return Response.json({ ok: false, error: 'too_fast' }, { status: 400 })

	const text = `🪞 <b>Новая заявка с сайта</b>
<b>Имя:</b> ${esc(p.name)}
<b>Контакт:</b> ${esc(p.contact)}
<b>Адрес установки:</b> ${esc(p.address)}
${
	p.comment ? `<b>Комментарий:</b> ${esc(p.comment)}\n` : ''
}⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Sofia' })}`

	const r = await fetch(
		`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
				text,
				parse_mode: 'HTML',
			}),
		}
	)
	const j = await r.json().catch(() => null)
	if (r.ok && j?.ok) return Response.json({ ok: true })
	return Response.json(
		{ ok: false, error: j?.description || 'tg_error' },
		{ status: 502 }
	)
}
