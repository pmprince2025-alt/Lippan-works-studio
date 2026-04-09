const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
// We need to use the service role key to bypass RLS for this migration, or anon key if RLS allows it on the admin side
// BUT the prompt has anon key, and admin uses authenticated access.
// An alternative is using anon key. The bucket product-images is PUBLIC, meaning anyone can read, but can anyone WRITE?
// Usually, only authenticated users can write. If RLS on storage bucket prevents upload, we might get an error.
// Let's try with ANON key + we might need to just execute a raw token or use the MCP server if possible, 
// OR simpler yet, if the anon key fails, I'll log it.

const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PUBLIC_DIR = path.join(__dirname, 'public');

async function migrate() {
    console.log("Starting image migration...");
    const files = fs.readdirSync(PUBLIC_DIR);
    const imageFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

    for (const file of imageFiles) {
        const filePath = path.join(PUBLIC_DIR, file);
        const fileData = fs.readFileSync(filePath);
        console.log(`Processing ${file}...`);
        
        let url;
        const bucketPath = `migrated/${file}`; // Store in a migrated subfolder

        // Let's check if we can skip uploading or if it already exists
        const { data, error } = await supabase.storage.from('product-images').upload(bucketPath, fileData, {
            contentType: file.endsWith('.jpg') ? 'image/jpeg' : 'image/png',
            upsert: true
        });
        
        if (error) {
            // It could be RLS policy preventing us. 
            console.error(`Failed to upload ${file}: ${error.message}`);
            // Let's fallback to assuming we can't do it as an anon user programmatically and report back.
            continue;
        }

        const publicURL = supabase.storage.from('product-images').getPublicUrl(bucketPath).data.publicUrl;
        console.log(`Uploaded to ${publicURL}`);
        
        // Update products matching this filename in DB
        const dbPath = `/${file}`;
        const { error: dbError } = await supabase.from('products').update({ image_url: publicURL }).eq('image_url', dbPath);
        if (dbError) {
            console.error(`Failed to update DB for ${file}: ${dbError.message}`);
        } else {
            console.log(`Successfully updated DB for products using ${file}`);
        }
    }
    console.log("Migration complete.");
}

migrate().catch(console.error);
