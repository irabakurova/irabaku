// заявка с формы «обсудим проект» → сообщение в telegram
// переменные окружения в vercel: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  if (b.website) { res.status(200).json({ ok: true }); return; } // ловушка для ботов
  const clip = (v, n) => String(v || '').trim().slice(0, n);
  const name = clip(b.name, 100), contact = clip(b.contact, 150), need = clip(b.need, 100), about = clip(b.about, 1500);
  if (!name || !contact || b.consent !== true) { res.status(400).json({ ok: false, error: 'fields' }); return; }
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) { res.status(500).json({ ok: false, error: 'not_configured' }); return; }
  const text = `новая заявка с irabaku.ru\n\nимя: ${name}\nчто нужно: ${need || '—'}\nсвязь: ${contact}\n\n${about || ''}`.trim();
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true })
    });
    if (!r.ok) throw new Error('telegram ' + r.status);
    res.status(200).json({ ok: true });
  } catch (e) { res.status(502).json({ ok: false, error: 'send' }); }
};
