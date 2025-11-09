export const runtime = 'nodejs'

type TgUser = { id: number; username?: string; first_name?: string }
type TgChat = {
	id: number
	type: 'private' | 'group' | 'supergroup' | 'channel'
}
type TgMessage = { text?: string; chat: TgChat; from?: TgUser }
type TgUpdate = { message?: TgMessage; edited_message?: TgMessage }

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID!
const SECRET = process.env.TELEGRAM_BOT_SECRET!

const tg = {
	async call(method: string, body: any) {
		const r = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		})
		const data = await r.json().catch(() => ({}))
		if (!r.ok || !data?.ok)
			throw new Error(data?.description || `tg_${r.status}`)
		return data.result
	},
	sendMessage(chat_id: number | string, text: string) {
		return this.call('sendMessage', { chat_id, text, parse_mode: 'HTML' })
	},
}

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const clean = (s: string) =>
	s
		.trim()
		.replace(/\s{2,}/g, ' ')
		.slice(0, 300)
const validContact = (v: string) =>
	/^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(v) || /^[+0-9()\-\s]{6,20}$/.test(v)

function isTelegram(req: Request) {
	return req.headers.get('x-telegram-bot-api-secret-token') === SECRET
}
function parseLead(raw: string) {
	// формат: /lead Имя | Контакт | Адрес | Комментарий(опц.)
	const m = raw.match(/^\/lead\s+(.+)$/i)
	if (!m) return null
	const parts = m[1].split('|').map(p => clean(p))
	const [name = '', contact = '', address = '', comment = ''] = parts
	return { name, contact, address, comment }
}

export async function POST(req: Request) {
	if (!isTelegram(req)) return new Response('forbidden', { status: 403 })

	let update: TgUpdate
	try {
		update = await req.json()
	} catch {
		return new Response('ok')
	}

	const msg = update.message ?? update.edited_message
	const text = msg?.text?.trim() ?? ''
	const chatId = msg?.chat.id
	if (!text || !chatId) return new Response('ok')

	try {
		if (text === '/start' || text.startsWith('/start ')) {
			await tg.sendMessage(
				chatId,
				`Здравствуйте! Отправьте заявку одной командой:

<code>/lead Имя | Контакт | Адрес | Комментарий</code>

Пример:
<code>/lead Иван П | +7 900 000-00-00 | СПб, Невский 1 | Зеркало 900×2100</code>`
			)
			return new Response('ok')
		}

		if (text.startsWith('/lead')) {
			const p = parseLead(text)
			if (
				!p ||
				p.name.length < 2 ||
				p.name.length > 60 ||
				!validContact(p.contact) ||
				p.address.length < 5
			) {
				await tg.sendMessage(
					chatId,
					'Неверный формат. Используйте:\n<code>/lead Имя | Контакт | Адрес | Комментарий(опц.)</code>'
				)
				return new Response('ok')
			}
			const payload = `🪞 <b>Новая заявка из Telegram</b>
<b>Имя:</b> ${esc(p.name)}
<b>Контакт:</b> ${esc(p.contact)}
<b>Адрес установки:</b> ${esc(p.address)}
${
	p.comment ? `<b>Комментарий:</b> ${esc(p.comment)}\n` : ''
}⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Sofia' })}`
			await tg.sendMessage(ADMIN_CHAT_ID, payload)
			await tg.sendMessage(chatId, 'Заявка отправлена ✅')
			return new Response('ok')
		}

		await tg.sendMessage(chatId, 'Не понял. Напишите /start для инструкции.')
		return new Response('ok')
	} catch {
		return new Response('ok')
	}
}
