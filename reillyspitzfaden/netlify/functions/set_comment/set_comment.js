// require('dotenv').config();

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
const supabase = createClient('https://abdrchiaagsnvanffqjl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHJjaGlhYWdzbnZhbmZmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTQwMDgsImV4cCI6MjAxOTg5MDAwOH0.3_8ocSvmJN6LWnibcNEhpv_zhVHwt5YS4srW12nXypc');

exports.handler = async (event, context, callback) => {
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {   
                name: JSON.parse(event.body).name,
                email: JSON.parse(event.body).email,
                postURL: "http://localhost:8888/blogposts/01-03-2024.html",
                comment: JSON.parse(event.body).comment,
                created_at: ((new Date()).toISOString()).toLocaleString('en-US'),
                show: true
            }
        ])
        .select()
        .then(() => {
            return {
                statusCode: 200,
                body: "success"
            };
        })
        .catch(() => {
            return {
                statusCode: 500,
                body: "error"
            };
        });
}