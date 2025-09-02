const getUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  return res.json();
};
export async function GET() {
  const users = await getUsers();
  return Response.json(users);
}
