const { createClient } = require("@supabase/supabase-js");

const supabaseClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY
);

async function helper_function(fileId) {
    try {
        let documentId = fileId

        if (!documentId) {
            throw new Error('No document ID provided.');
        }

        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
            throw new Error('Supabase configuration not set.');
        }

        console.log(`Attempting to delete document with ID: ${documentId}`);

        console.log(typeof (documentId))
        const { data, error } = await supabaseClient
            .from('documents')
            .delete()
            .eq('metadata->>documentId', documentId);

        console.log(data, error)

        if (error) {
            console.error('Supabase delete error:', error);
            throw new Error;
        }

        console.log(`Deletion result:`, data);
        return true;

    } catch (error) {
        console.error('Error deleting document:', error);
        throw new Error
    }
}

exports.final_response = async function (options) {
    try {
        options = this.parse(options)
        const file_id = options.file_id;
        const response = await helper_function(file_id)
        return response;
    } catch (error) {
        console.log(`Error in uploading - ${error.message}`)
    }
}