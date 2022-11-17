import React from 'react';
import {
  format,
  formatDistanceToNow,
  differenceInWeeks,
  isToday,
} from 'date-fns';
import { Album as AlbumInterface } from './useAlbums';

function Album({ album }: { album: AlbumInterface }) {
  return (
    <li
      key={album.id}
      className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5 md:p-5 p-3"
    >
      <div>
        <div className="w-full">
          <img className="w-full rounded-md" src={album.image.src} alt="" />
        </div>
        <div className="mt-2">
          <p className="text-sm font-medium text-white">{album.name}</p>
          <p className="text-sm text-white opacity-70">
            <span className="font-bold">{album.ranking}</span>{' '}
            {album.artist.name}
          </p>
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

export default Album;
