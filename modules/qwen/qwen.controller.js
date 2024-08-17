
const OpenAI = require('openai');
const API_BASE = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const API_KEY = 'sk-a68a3e697ede402e9e1944c3c02fe260';

module.exports = {
  async qwenChat(ctx) {
    console.log(ctx.request.body);
    const openai = new OpenAI({
      apiKey: API_KEY,
      baseURL: API_BASE,
      temperature: 0
    });
    const message = ctx.request.body.message;
    const prompt = ',用中文回答';
    const completion = await openai.chat.completions.create({
      messages: [
        {
          'role': 'user',
          'content': message + prompt,
        }],
      model: 'qwen-max'
    });

    const content = await completion.choices[0].message.content;
    ctx.body = { success: true, data: { content } };
  }
};
