const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

exports.handler = async (event, context, callback) => {
    let returnVals
    try {
        returnVals = await supabase
        .from('comments')
        .select('name, email, comment, created_at')
        .eq('postURL', JSON.parse(event.body).postURL)
        
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
              error: e.message,
              url: DATABASE_URL
            })
          }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(returnVals.data)
    };
}