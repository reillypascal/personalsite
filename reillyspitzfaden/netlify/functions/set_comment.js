const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

exports.handler = async (event, context, callback) => {
    let data
    try {
        data = await supabase
        .from('comments')
        .insert([
            {   
                name: JSON.parse(event.body).name,
                email: JSON.parse(event.body).email,
                postURL: JSON.parse(event.body).postURL,
                comment: JSON.parse(event.body).comment,
                created_at: ((new Date()).toISOString()).toLocaleString('en-US'),
                show: true
            }
        ])
        .select()
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
              error: e.message
            })
          }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}