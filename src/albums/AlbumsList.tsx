import React from 'react';
import { Album as AlbumInterface } from './useAlbums';
import Album from './Album';

function AlbumsList({
  albums,
  loading,
}: {
  albums: AlbumInterface[];
  loading: boolean;
}) {
  if (loading) {
    return <div className="md:p-5 p-3 text-white opacity-30">Loading...</div>;
  }

  if (albums.length === 0) {
    return (
      <div className="md:p-5 p-3 text-white opacity-30">No albums found</div>
    );
  }

  return (
    <ul className="flex flex-wrap">
      {albums.map((album) => (
        <Album album={album} key={album.id} />
      ))}
    </ul>
  );
}

export default AlbumsList;
