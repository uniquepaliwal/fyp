const { BufferMemory } = require("langchain/memory");
const { ChatOpenAI } = require("@langchain/openai");
const { ConversationChain } = require("langchain/chains");



async function response_from_gpt(userQuery, userMemory) {
    const openapikey = process.env.OPENAI_API_KEY;
    const chatModel = new ChatOpenAI({
        openAIApiKey: openapikey,
        modelName: "gpt-4",
    });
    const systemPrompt = `
    identity:
        description: "You are a Final year project chatbot, which is a rag based chatbot which answer from a particular part of a file."
    response_type:
        - The response must be in JSON format: {"gpt_solution":""}
    `;
    const conversation = new ConversationChain({
        llm: chatModel
    });
    try {
        const response = await conversation.call({ input: userQuery });
        return (response.response);
    } catch (err) {
        console.error("Error while retrieving and generating response from OpenAI:", err);
        throw new Error(`Error while retrieving and generating response from OpenAI: ${err.message}`);
    }
}

exports.final_response = async function (options) {
    try {
        options = this.parse(options)
        const userQuery = JSON.stringify(options.userQuery);
        const response = await response_from_gpt(userQuery)
        return JSON.parse(response);
    } catch (error) {
        console.log(`Error in final response - ${error.message}`)
    }
}