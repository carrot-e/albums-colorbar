import React from 'react';
import { format } from 'date-fns';
import { Album as AlbumInterface } from '../hooks/useAlbums';

function AlbumDetails({
  album,
  onClose,
}: {
  album: AlbumInterface;
  onClose: () => void;
}) {
  if (!album) {
    return null;
  }

  return (
    <div className="pl-10 pr-10 pb-10 pt-5 flex flex-col h-full">
      <div className="flex justify-end mb-2.5 font-bold text-xl opacity-50 hover:opacity-100 transition">
        <button onClick={onClose}>Close</button>
      </div>
      <div className="w-full mb-6 relative bg-black">
        <img
          className="w-full opacity-75"
          src={album.image.src}
          alt={album.name}
        />
        <div
          className="rotated absolute rounded-full bg-cover"
          style={{ backgroundImage: `url('${album.image.src}')` }}
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <p className="text-xl mb-2.5 font-bold italic">#{album.ranking}</p>
          <p className="text-4xl font-bold mb-5">{album.name}</p>
          <p className="text-xl mb-3 opacity-50">
            Album by {album.artist.name}
            {' • '}
            {format(album.releaseDate, 'dd.MM.yyyy')}
            {' • '}
            {album.itemCount} {+album.itemCount === 1 ? 'song' : 'songs'}
          </p>

          <p className="text-xl mb-5">Genre: {album.category.label}</p>
          <p className="text-sm mb-10">{album.rights}</p>
        </div>
        <div className="mb-5 font-bold italic text-xl">
          <a
            className="text-xl"
            href={album.link}
            target="_blank"
            rel="noreferrer"
          >
            Listen on iTunes →
          </a>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetails;
