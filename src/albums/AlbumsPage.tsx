import React, { useEffect, useState } from 'react';
import useAlbums from './useAlbums';
import AlbumsList from './AlbumsList';

function AlbumsPage() {
  const { fetchAlbums, loading, data } = useAlbums();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchAlbums();
        setInitialized(true);
      } catch (e) {
        // TODO: Proper error logging?
        console.error('An error happened while fetching the data', e);
      }
    })();
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <div className="container bg-stone-800 min-h-screen min-w-full md:px-11 px-6">
      <header className="mb-5 md:p-5 p-3">
        <h1 className="text-3xl font-bold text-white mb-5 pt-36">
          What&apos;s on today?
        </h1>
      </header>
      <AlbumsList albums={data} loading={loading} />
    </div>
  );
}

export default AlbumsPage;