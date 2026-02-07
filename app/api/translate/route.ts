import { NextRequest, NextResponse } from 'next/server';

const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const MAX_TEXTS = 50;

export async function POST(request: NextRequest) {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'DEEPL_API_KEY not configured' }, { status: 500 });
  }

  let body: { texts: string[]; sourceLang: string; targetLang: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { texts, sourceLang, targetLang } = body;

  if (!Array.isArray(texts) || texts.length === 0) {
    return NextResponse.json({ error: 'texts must be a non-empty array' }, { status: 400 });
  }
  if (texts.length > MAX_TEXTS) {
    return NextResponse.json({ error: `Maximum ${MAX_TEXTS} texts per request` }, { status: 400 });
  }
  if (!sourceLang || !targetLang) {
    return NextResponse.json({ error: 'sourceLang and targetLang are required' }, { status: 400 });
  }

  const params = new URLSearchParams();
  texts.forEach((t) => params.append('text', t));
  params.append('source_lang', sourceLang);
  params.append('target_lang', targetLang);
  params.append('tag_handling', 'html');

  const response = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `DeepL API error: ${response.status}`, details: errorText },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json({ translations: data.translations });
}
