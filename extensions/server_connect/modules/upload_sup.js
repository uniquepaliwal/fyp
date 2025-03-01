const fs = require('fs');
const path = require('path');
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { SupabaseVectorStore } = require("@langchain/community/vectorstores/supabase");
const { createClient } = require("@supabase/supabase-js");

const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
);

async function helper_function(filePath, fileID, fileName) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.error('OpenAI API key not set');
            throw new Error('openai api key not set.');
        }
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
            console.error('Supabase configuration not set');
            throw new Error('supabase configuration not set');
        }
        currentDocumentId = fileID
        console.log('Generated document ID:', currentDocumentId);
        let docs;
        const fileExtension = path.extname(filePath).toLowerCase();
        console.log('File extension:', fileExtension);
        if (fileExtension === '.pdf') {
            console.log('Processing PDF file');
            const loader = new PDFLoader(filePath);
            docs = await loader.load();
            console.log(`PDF loaded: ${docs.length} pages`);
        } else {
            console.log('Processing text file');
            const text = fs.readFileSync(filePath, 'utf8');
            console.log(`Text file loaded: ${text.length} characters`);
            const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200
            });
            docs = await textSplitter.createDocuments([text]);
            console.log(`Created ${docs.length} document chunks`);
        }
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        });
        const splitDocs = await textSplitter.splitDocuments(docs);
        console.log(`Split into ${splitDocs.length} chunks`);
        const docsWithMetadata = splitDocs.map(doc => {
            doc.metadata.documentId = currentDocumentId;
            doc.metadata.filename = fileName;
            doc.metadata.uploadedAt = new Date().toISOString();
            return doc;
        });
        console.log('Added metadata to document chunks');
        console.log('Creating embeddings and storing in Supabase');
        const embeddings = new OpenAIEmbeddings();
        try {
            await SupabaseVectorStore.fromDocuments(
                docsWithMetadata,
                embeddings,
                {
                    client: supabaseClient,
                    tableName: "documents",
                    queryName: "match_documents"
                }
            );
            console.log('Successfully stored embeddings in Supabase');
        } catch (supabaseError) {
            console.error('Error storing in Supabase:', supabaseError);
            throw new EupabaseError;
        }
        console.log('Document processing completed successfully');
        return 'success'
    } catch (error) {
        throw new Error
    }
}

exports.upload_sup = async function (options) {
    try {
        options = this.parse(options)
        let file_path = options.file_path
        const file_id = options.file_id
        file_path = file_path.startsWith("/") ? file_path.slice(1) : file_path;
        const file_name = file_path.split('/').pop();
        const response = await helper_function(file_path, file_id, file_name)
        return response;
    } catch (error) {
        console.log(`Error in uploading - ${error.message}`)
    }
}