'use client';

import { use, useEffect, useState } from 'react';

interface GeoLocation {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  address: Address;
}

function UserPage({ params }: { params: Promise<{ userId: string }> }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const unwrappedParams = use(params);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${unwrappedParams.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [unwrappedParams.userId]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );

  if (error)
    return (
      <div className='bg-red-50 border-l-4 border-red-500 p-4'>
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

  if (!user)
    return (
      <div className='bg-blue-50 border-l-4 border-blue-500 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <svg
              className='h-5 w-5 text-blue-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='ml-3'>
            <p className='text-sm text-blue-700'>No user found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-2'>
        User Details
      </h1>

      <div className='space-y-4'>
        <div className='flex items-center'>
          <span className='w-32 font-medium text-gray-600'>User ID:</span>
          <span className='text-gray-800'>{user.id}</span>
        </div>

        <div className='flex items-center'>
          <span className='w-32 font-medium text-gray-600'>Name:</span>
          <span className='text-gray-800'>{user.name}</span>
        </div>

        <div className='flex items-center'>
          <span className='w-32 font-medium text-gray-600'>Email:</span>
          <span className='text-gray-800'>{user.email}</span>
        </div>
      </div>

      <div className='mt-8 space-y-4'>
        <h2 className='text-xl font-semibold text-gray-700 border-b pb-2'>
          Address
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <p className='text-sm font-medium text-gray-500'>Street</p>
            <p className='text-gray-800'>{user.address.street}</p>
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500'>Suite</p>
            <p className='text-gray-800'>{user.address.suite}</p>
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500'>City</p>
            <p className='text-gray-800'>{user.address.city}</p>
          </div>

          <div>
            <p className='text-sm font-medium text-gray-500'>Zipcode</p>
            <p className='text-gray-800'>{user.address.zipcode}</p>
          </div>

          <div className='md:col-span-2'>
            <p className='text-sm font-medium text-gray-500'>Location</p>
            <p className='text-gray-800'>
              Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
