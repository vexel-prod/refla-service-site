<?php
declare(strict_types=1);

mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Sofia');
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../bot/config.php';

function json_out($code, $payload) {
  http_response_code((int)$code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}
function bad($code, $msg) { json_out($code, ['ok' => false, 'error' => $msg]); }
function h($s) { return htmlspecialchars(trim((string)$s), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

function tg_call_json($method, $payload, $timeout = 10) {
  $ch = curl_init("https://api.telegram.org/bot" . BOT_TOKEN . "/" . $method);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => (int)$timeout,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
  ]);
  $res = curl_exec($ch);
  $http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);

  $j = $res ? json_decode($res, true) : null;
  if (!is_array($j) || empty($j['ok'])) {
    error_log("lead.php tg_call_json failed method=$method http=$http curl=$err res=" . (string)$res);
    bad(502, 'telegram_failed');
  }
  return $j;
}

function tg_call_multipart($method, $postFields, $timeout = 15) {
  $ch = curl_init("https://api.telegram.org/bot" . BOT_TOKEN . "/" . $method);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => (int)$timeout,
    CURLOPT_POSTFIELDS => $postFields,
  ]);
  $res = curl_exec($ch);
  $http = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err = curl_error($ch);
  curl_close($ch);

  $j = $res ? json_decode($res, true) : null;
  if (!is_array($j) || empty($j['ok'])) {
    error_log("lead.php tg_call_multipart failed method=$method http=$http curl=$err res=" . (string)$res);
    bad(502, 'telegram_failed');
  }
  return $j;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') bad(405, 'method');

$name    = trim((string)($_POST['name'] ?? ''));
$contact = trim((string)($_POST['contact'] ?? ''));
$address = trim((string)($_POST['address'] ?? ''));
$comment = trim((string)($_POST['comment'] ?? ''));
$hp      = trim((string)($_POST['hp'] ?? ''));
$ftRaw   = trim((string)($_POST['ft'] ?? ''));

if ($hp !== '') bad(400, 'bot');
if ($name === '' || $contact === '' || $address === '') bad(422, 'invalid');

$isEmail = (bool)preg_match('/^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/u', $contact);
$isPhone = (bool)preg_match('/^[+0-9()\-\s]{6,20}$/u', $contact);
if (!$isEmail && !$isPhone) bad(422, 'invalid_contact');

// анти-бот: ft = timestamp старта заполнения (мс)
if ($ftRaw !== '' && ctype_digit($ftRaw)) {
  $ft = (int)$ftRaw;
  $elapsed = (int)(microtime(true) * 1000) - $ft;
  if ($elapsed >= 0 && $elapsed < 1500) bad(429, 'too_fast');
}

$text =
  "🪞 <b>Новая заявка с сайта</b>\n"
  . "<b>Имя:</b> " . h($name) . "\n"
  . "<b>Контакт:</b> " . h($contact) . "\n"
  . "<b>Адрес установки:</b> " . h($address) . "\n"
  . ($comment !== '' ? "<b>Комментарий:</b> " . h($comment) . "\n" : '')
  . "⏰ " . date('d.m.Y H:i:s');

// Сбор photo[] (или photo)
$files = [];
if (isset($_FILES['photo'])) {
  $f = $_FILES['photo'];

  if (isset($f['name']) && is_array($f['name'])) {
    $count = count($f['name']);
    for ($i = 0; $i < $count; $i++) {
      if (($f['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
      $files[] = [
        'name' => (string)$f['name'][$i],
        'tmp'  => (string)$f['tmp_name'][$i],
        'err'  => (int)$f['error'][$i],
        'size' => (int)$f['size'][$i],
      ];
    }
  } else if (!empty($f['name'])) {
    if (($f['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
      $files[] = [
        'name' => (string)$f['name'],
        'tmp'  => (string)$f['tmp_name'],
        'err'  => (int)$f['error'],
        'size' => (int)$f['size'],
      ];
    }
  }
}

$MAX_PHOTOS = 5;
if (count($files) > $MAX_PHOTOS) $files = array_slice($files, 0, $MAX_PHOTOS);

$maxBytes = 8 * 1024 * 1024;
$allowed = ['image/jpeg', 'image/png', 'image/webp'];

$validated = [];
$fi = class_exists('finfo') ? new finfo(FILEINFO_MIME_TYPE) : null;

for ($i = 0; $i < count($files); $i++) {
  $f = $files[$i];

  if (($f['err'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) bad(400, 'upload_failed');
  if (($f['size'] ?? 0) <= 0 || ($f['size'] ?? 0) > $maxBytes) bad(413, 'file_too_large');

  $tmp = (string)($f['tmp'] ?? '');
  if ($tmp === '' || !is_uploaded_file($tmp)) bad(400, 'bad_file');

  $mime = '';
  if ($fi) {
    $mime = (string)($fi->file($tmp) ?: '');
  } else {
    $info = @getimagesize($tmp);
    $mime = is_array($info) && !empty($info['mime']) ? (string)$info['mime'] : '';
  }

  if (!in_array($mime, $allowed, true)) bad(415, 'unsupported_file');

  $validated[] = [
    'tmp' => $tmp,
    'mime' => $mime,
    'name' => (string)($f['name'] ?? 'photo'),
  ];
}

if (count($validated) === 0) {
  tg_call_json('sendMessage', ['chat_id' => ADMIN_CHAT_ID, 'text' => $text, 'parse_mode' => 'HTML']);
  json_out(200, ['ok' => true]);
}

if (count($validated) === 1) {
  $p = $validated[0];
  tg_call_multipart('sendPhoto', [
    'chat_id' => ADMIN_CHAT_ID,
    'photo' => new CURLFile($p['tmp'], $p['mime'], $p['name']),
    'caption' => $text,
    'parse_mode' => 'HTML',
  ], 20);
  json_out(200, ['ok' => true]);
}

// Альбом (sendMediaGroup)
$media = [];
$post = ['chat_id' => ADMIN_CHAT_ID];

for ($i = 0; $i < count($validated); $i++) {
  $p = $validated[$i];
  $key = "file{$i}";
  $post[$key] = new CURLFile($p['tmp'], $p['mime'], $p['name']);

  $item = ['type' => 'photo', 'media' => "attach://$key"];
  if ($i === 0) {
    $item['caption'] = $text;
    $item['parse_mode'] = 'HTML';
  }
  $media[] = $item;
}

$post['media'] = json_encode($media, JSON_UNESCAPED_UNICODE);
tg_call_multipart('sendMediaGroup', $post, 25);

json_out(200, ['ok' => true]);
