
const OpenAI = require('openai');
const API_BASE = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const API_KEY = 'sk-a68a3e697ede402e9e1944c3c02fe260';

exports.qwenChat = async () => {
  const openai = new OpenAI({
    apiKey: API_KEY,
    baseURL: API_BASE,
    temperature: 0
  });
  const Prompt = 'Hi';
  const completion = await openai.chat.completions.create({
    messages: [
      {
        'role': 'user',
        'content': Prompt + ',用中文回答',
      }],
    model: 'qwen-plus'
  });

  const Content = await completion.choices[0].message.content;
  console.log('Output' + Content);
};
