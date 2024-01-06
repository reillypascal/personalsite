// require('dotenv').config();

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
const supabase = createClient('https://abdrchiaagsnvanffqjl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHJjaGlhYWdzbnZhbmZmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTQwMDgsImV4cCI6MjAxOTg5MDAwOH0.3_8ocSvmJN6LWnibcNEhpv_zhVHwt5YS4srW12nXypc');

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
              error: e.message
            })
          }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(returnVals.data)
    };
}