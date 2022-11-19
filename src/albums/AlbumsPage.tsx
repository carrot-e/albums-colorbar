import React, { useEffect, useMemo, useState } from 'react';
import useAlbums from './useAlbums';
import AlbumsList from './AlbumsList';
import Search from './Search';

function AlbumsPage() {
  const { fetchAlbums, loading, data } = useAlbums();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await fetchAlbums();
        setInitialized(true);
      } catch (e) {
        // TODO: Proper error logging
        console.error('An error happened while fetching the data', e);
      }
    })();
  }, []);

  const albums = useMemo(() => {
    const query = searchQuery.toLowerCase().trim().replace(/\s+/, '');
    return data.filter(
      (album) =>
        album.name.toLowerCase().includes(query) ||
        album.artist.name.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  if (!initialized) {
    return <div className="bg-stone-800 min-h-screen min-w-full" />;
  }

  return (
    <div className="container bg-stone-800 min-h-screen min-w-full md:px-11 px-6">
      <header className="mb-5 md:p-5 p-3">
        <h1 className="text-3xl font-bold text-white mb-5 pt-36">
          What&apos;s on today?
        </h1>
        <Search searchQuery={searchQuery} onChange={setSearchQuery} />
      </header>
      <AlbumsList albums={albums} loading={loading} />
    </div>
  );
}

export default AlbumsPage;
