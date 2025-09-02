import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

export default async function Posts() {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  const posts: Post[] = await res.json();

  return (
    <div>
      <h1 className='text-2xl font-bold'>Posts</h1>
      <ul className='mt-4 space-y-2'>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className='text-blue-600 hover:underline'
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
