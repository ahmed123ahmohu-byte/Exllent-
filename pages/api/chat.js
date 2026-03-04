import OpenAI from 'openai';
import { nexaSystemPrompt } from '../../lib/persona';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages = [] } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({
      content:
        'أنا نيكسا جاهز 🙌 لكن مفتاح OpenAI غير مضاف حالياً. أضف OPENAI_API_KEY في البيئة، وسأرجع بكامل الذكاء.\n\n```html\n<div style="font-family:sans-serif;color:#0f172a;padding:20px">Nexa Preview Ready</div>\n```'
    });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: nexaSystemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.7
    });

    const content = completion.choices?.[0]?.message?.content || 'أحتاج توضيح أكثر 👀';
    return res.status(200).json({ content });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
