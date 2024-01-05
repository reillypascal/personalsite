// require('dotenv').config();

const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

const { createClient } = require('@supabase/supabase-js');
// const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
const supabase = createClient('https://abdrchiaagsnvanffqjl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZHJjaGlhYWdzbnZhbmZmcWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTQwMDgsImV4cCI6MjAxOTg5MDAwOH0.3_8ocSvmJN6LWnibcNEhpv_zhVHwt5YS4srW12nXypc');

exports.handler = async (event, context, callback) => {
    // let payload = JSON.parse(event.body).payload;
    const { data, error } = await supabase
        .from('comments')
        .insert([
            {   
                id: 7,
                name: "Jane Doe",
                email: "janedoe@mailinator.com",
                postURL: "http://localhost:8888/blogposts/01-03-2024.html",
                comment: 'Jane Doe',
                created_at: '2024-01-03 00:00:00+00',
                show: 'true'
            }
        ])
        .select()
        .then((data) => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            };
        });
}