const { OpenAIEmbeddings } = require("@langchain/openai");
const { SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { createClient } = require("@supabase/supabase-js");
const { ChatOpenAI } = require("@langchain/openai");
const { RetrievalQAChain } = require("langchain/chains");

const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
);

async function response_from_gpt(userQuery) {
    try {
        const question = userQuery;

        if (!question) {
            throw new Error('No question provided.');
        }
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not set.');
        }
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
            throw new Error('Supabase configuration not set.');
        }
        const embeddings = new OpenAIEmbeddings();
        const vectorStore = await SupabaseVectorStore.fromExistingIndex(
            embeddings,
            {
                client: supabaseClient,
                tableName: "documents",
                queryName: "match_documents"
            }
        );
        const model = new ChatOpenAI();
        const chain = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
            {
                returnSourceDocuments: true
            }
        );
        const response = await chain.call({
            query: question
        });
        const sourceReferences = response.sourceDocuments ?
            response.sourceDocuments.map(doc => {
                let text = doc.pageContent;
                if (text.length > 300) {
                    text = text.substring(0, 300) + "...";
                }
                return {
                    text: text,
                    metadata: doc.metadata
                };
            }) : [];

        return {
            answer: response.text,
            sources: sourceReferences
        };

    } catch (error) {
        console.error('Error querying document:', error);
        throw error
    }
}

exports.final_response = async function (options) {
    try {
        options = this.parse(options)
        const userQuery = options.userQuery
        console.log(options)
        const response = await response_from_gpt(userQuery)
        return response;
    } catch (error) {
        console.log(`Error in final response - ${error.message}`)
    }
}