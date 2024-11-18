// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPostData() {
  // Define the file path to the Markdown file
  const filePath = path.join(process.cwd(), 'posts', 'hello-world.md');

  // Read the content of the Markdown file as a string
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Use gray-matter to parse the front matter and content
  const { data, content } = matter(fileContents);

  // Return both the front matter (metadata) and the content
  return { data, content };
}
