'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='bg-gray-900 text-white p-4'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
          {' '}
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <Link href='/posts'>Posts</Link>
          <Link href='/users'>Users</Link>
        </div>
        <div className='flex gap-4'>
          <Link href='/auth/login'>Login</Link>
          <Link href='/auth/signup'>Signup</Link>
        </div>
      </div>
    </nav>
  );
}
