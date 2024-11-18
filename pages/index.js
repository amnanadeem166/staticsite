// pages/index.js
import { getPostData } from '../lib/posts';

export default function Home({ postData }) {
  return (
    <div>
      <h1>{postData.data.title}</h1>
      <p>{postData.data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </div>
  );
}

// This function runs on the server side during build time
export async function getStaticProps() {
  const postData = getPostData();
  return {
    props: {
      postData
    }
  };
}
