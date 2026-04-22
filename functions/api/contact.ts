// Cloudflare Pages Function: POST /api/contact
// Sends contact form submissions to chrisjasonmcqueen@icloud.com via Resend.
//
// REQUIRED Cloudflare Pages environment variables (set in dashboard):
//   RESEND_API_KEY  - get free at https://resend.com (3000 emails/mo)
//   TO_EMAIL        - chrisjasonmcqueen@icloud.com
//   FROM_EMAIL      - hello@chrisjasonmcqueen.com (must be a verified domain in Resend)
//
// If RESEND_API_KEY is not set, the function logs the message and returns success
// (handy for local previews — you'll see it in Cloudflare logs).

interface Env {
  RESEND_API_KEY?: string;
  TO_EMAIL?: string;
  FROM_EMAIL?: string;
}

interface Body {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  website?: string; // honeypot
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  // Honeypot — bots fill the hidden "website" field
  if (body.website && body.website.length > 0) {
    return json({ ok: true }); // pretend success
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const topic = (body.topic || 'General').trim();
  const message = (body.message || '').trim();

  if (!name || !email || !message) {
    return json({ error: 'Please fill in name, email, and message.' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'That email address looks off.' }, 400);
  }

  if (message.length > 5000) {
    return json({ error: 'Message too long.' }, 400);
  }

  const to = env.TO_EMAIL || 'chrisjasonmcqueen@icloud.com';
  const from = env.FROM_EMAIL || 'onboarding@resend.dev'; // works without a verified domain
  const subject = `[${topic}] ${name} via chrisjasonmcqueen.com`;

  const html = `
    <h2>New message from your site</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
    <hr/>
    <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
  `;

  if (!env.RESEND_API_KEY) {
    // No API key set yet — log so you can see submissions in Cloudflare → Functions logs
    console.log('CONTACT (no Resend key set):', { name, email, topic, message });
    return json({ ok: true, dev: true });
  }

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Chris Jason McQueen <${from}>`,
      to: [to],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error('Resend error:', resp.status, text);
    return json({ error: 'Email service rejected the message.' }, 502);
  }

  return json({ ok: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
