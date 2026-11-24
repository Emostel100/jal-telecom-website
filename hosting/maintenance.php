<?php
http_response_code(503);
header('Content-Type: text/html; charset=utf-8');
header('Retry-After: 3600');
header('Cache-Control: no-store, max-age=0');
header('X-Robots-Tag: noindex, nofollow');
$requestedLanguage = $_GET['lang'] ?? '';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$portuguese = $requestedLanguage === 'pt' || ($requestedLanguage !== 'en' && preg_match('~^/pt(?:/|$)~', $path));
readfile(__DIR__ . ($portuguese ? '/maintenance-pt.html' : '/maintenance.html'));
