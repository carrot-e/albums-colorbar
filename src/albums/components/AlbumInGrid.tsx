import {
  differenceInWeeks,
  format,
  formatDistanceToNow,
  isToday,
} from 'date-fns';
import React, { useContext } from 'react';
import { Album as AlbumInterface } from '../hooks/useAlbums';
import PageStateContext from '../context/PageStateContext';

function AlbumInGrid({ album }: { album: AlbumInterface }) {
  const { setSelectedAlbum } = useContext(PageStateContext);
  return (
    <li
      className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5 md:p-5 p-3 cursor-pointer"
      onClick={() => setSelectedAlbum(album.id)}
    >
      <div>
        <div className="w-full">
          <img
            className="w-full rounded-md"
            src={album.image.src}
            alt={album.name}
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-bold text-white">{album.name}</p>
          <p className="text-md text-white opacity-70">{album.artist.name}</p>
          {isToday(album.releaseDate) && (
            <p className="text-sm text-white opacity-50">Today</p>
          )}
          {differenceInWeeks(new Date(), album.releaseDate) >= 1 && (
            <p className="text-sm text-white opacity-50">
              {format(album.releaseDate, 'dd MMMM yyyy')}
            </p>
          )}
          {differenceInWeeks(new Date(), album.releaseDate) < 1 &&
            !isToday(album.releaseDate) && (
              <p className="text-sm text-white opacity-30">
                {formatDistanceToNow(album.releaseDate)} ago
              </p>
            )}
        </div>
      </div>
    </li>
  );
}

export default AlbumInGrid;
