<?php
declare(strict_types=1);

mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Sofia');
header('Content-Type: text/plain; charset=utf-8');

require __DIR__ . '/../../bot/config.php';

function esc(string $s): string {
  return str_replace(['&', '<', '>'], ['&amp;', '&lt;', '&gt;'], $s);
}

function clean(string $s): string {
  $s = trim($s);
  $s = preg_replace('/\s{2,}/u', ' ', $s) ?? $s;
  if (mb_strlen($s) > 300) $s = mb_substr($s, 0, 300);
  return $s;
}

function valid_contact(string $v): bool {
  return (bool)preg_match('/^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/u', $v)
      || (bool)preg_match('/^[+0-9()\-\s]{6,20}$/u', $v);
}

function tg_call(string $method, array $body): ?array {
  $ch = curl_init("https://api.telegram.org/bot" . BOT_TOKEN . "/" . $method);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE),
  ]);
  $res = curl_exec($ch);
  curl_close($ch);

  $data = $res ? json_decode($res, true) : null;
  if (!is_array($data) || empty($data['ok'])) return null;
  return $data['result'] ?? [];
}

function tg_send(int|string $chatId, string $text): void {
  tg_call('sendMessage', [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML',
  ]);
}

function parse_lead(string $raw): ?array {
  // формат: /lead Имя | Контакт | Адрес | Комментарий(опц.)
  if (!preg_match('/^\/lead\s+(.+)$/iu', $raw, $m)) return null;
  $parts = array_map('clean', explode('|', $m[1]));
  $name = $parts[0] ?? '';
  $contact = $parts[1] ?? '';
  $address = $parts[2] ?? '';
  $comment = $parts[3] ?? '';
  return ['name' => $name, 'contact' => $contact, 'address' => $address, 'comment' => $comment];
}

/** Проверка Telegram secret header */
$secretHeader = $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'] ?? '';
if ($secretHeader !== WEBHOOK_SECRET) {
  http_response_code(403);
  echo "forbidden";
  exit;
}

$raw = file_get_contents('php://input');
$update = json_decode($raw ?: '', true);
if (!is_array($update)) {
  echo "ok";
  exit;
}

$msg = $update['message'] ?? $update['edited_message'] ?? null;
$text = is_array($msg) ? trim((string)($msg['text'] ?? '')) : '';
$chatId = (is_array($msg) && isset($msg['chat']['id'])) ? $msg['chat']['id'] : null;

if ($text === '' || $chatId === null) {
  echo "ok";
  exit;
}

try {
  if ($text === '/start' || str_starts_with($text, '/start ')) {
    tg_send(
      $chatId,
      "Здравствуйте! Отправьте заявку одной командой:\n\n"
      . "<code>/lead Имя | Контакт | Адрес | Комментарий</code>\n\n"
      . "Пример:\n"
      . "<code>/lead Иван П | +7 900 000-00-00 | СПб, Невский 1 | Зеркало 900×2100</code>"
    );
    echo "ok";
    exit;
  }

  if (str_starts_with($text, '/lead')) {
    $p = parse_lead($text);
    if (
      !$p ||
      mb_strlen($p['name']) < 2 ||
      mb_strlen($p['name']) > 60 ||
      !valid_contact($p['contact']) ||
      mb_strlen($p['address']) < 5
    ) {
      tg_send(
        $chatId,
        "Неверный формат. Используйте:\n<code>/lead Имя | Контакт | Адрес | Комментарий(опц.)</code>"
      );
      echo "ok";
      exit;
    }

    $payload =
      "🪞 <b>Новая заявка из Telegram</b>\n"
      . "<b>Имя:</b> " . esc($p['name']) . "\n"
      . "<b>Контакт:</b> " . esc($p['contact']) . "\n"
      . "<b>Адрес установки:</b> " . esc($p['address']) . "\n"
      . ($p['comment'] !== '' ? "<b>Комментарий:</b> " . esc($p['comment']) . "\n" : '')
      . "⏰ " . date('d.m.Y H:i:s');

    tg_send(ADMIN_CHAT_ID, $payload);
    tg_send($chatId, "Заявка отправлена ✅");

    echo "ok";
    exit;
  }

  tg_send($chatId, "Не понял. Напишите /start для инструкции.");
  echo "ok";
  exit;
} catch (Throwable $e) {
  // Для Telegram важно получать 200 OK. Ошибки не наружу.
  echo "ok";
  exit;
}
