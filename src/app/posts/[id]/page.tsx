interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostDetailParams {
  params: {
    id: string;
  };
}

export default async function PostDetail({ params }: PostDetailParams) {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',
  });
  const posts: Post[] = await res.json();
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold'>{post.title}</h1>
      <p className='mt-2'>{post.content}</p>
    </div>
  );
}
