const { ChatBot } = require('../app/modules/chatbot'); // Adjust the import path as needed

describe('ChatBot', () => {
  let chatbot;

  beforeEach(() => {
    chatbot = new ChatBot();
  });

  test('should initialize with default settings', () => {
    expect(chatbot).toBeDefined();
  });

  test('should process user messages', async () => {
    const response = await chatbot.processMessage('Hello, how are you?');
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  });

  test('should handle empty messages', async () => {
    const response = await chatbot.processMessage('');
    expect(response).toBeDefined();
    expect(response).toContain('Please provide a valid message');
  });

  test('should maintain conversation context', async () => {
    await chatbot.processMessage('My name is John');
    const response = await chatbot.processMessage('What is my name?');
    expect(response).toContain('John');
  });
}); 