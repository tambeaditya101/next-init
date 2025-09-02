'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users', {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border-l-4 border-red-500 p-4 max-w-2xl mx-auto mt-8 rounded'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <svg
              className='h-5 w-5 text-red-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='ml-3'>
            <p className='text-sm text-red-700'>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>
        User Directory
      </h1>

      <div className='space-y-3'>
        {users.map((user) => (
          <div
            key={user.id}
            className='p-4 hover:bg-gray-50 rounded-lg transition-colors'
          >
            <Link href={`/users/${user.id}`}>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='font-medium text-gray-800'>{user.name}</h2>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
                <svg
                  className='h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
