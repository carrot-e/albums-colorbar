import React, { useContext } from 'react';
import { Album as AlbumInterface } from '../hooks/useAlbums';
import Album from './Album';
import PageStateContext, { AlbumView } from '../context/PageStateContext';
import useMousePosition from '../hooks/useMousePosition';
import MousePositionContext from '../context/MousePositionContext';

function AlbumsList({
  albums,
  loading,
}: {
  albums: AlbumInterface[];
  loading: boolean;
}) {
  const { setMainColor, view, selectedAlbum } = useContext(PageStateContext);
  const mousePosition = useMousePosition();

  if (loading) {
    return (
      <div className="md:p-5 p-3 text-white opacity-30 text-center">
        Loading...
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="md:p-5 p-3 text-white opacity-30 text-center">
        No albums found
      </div>
    );
  }

  return (
    <MousePositionContext.Provider value={mousePosition}>
      <div
        className={
          view === AlbumView.ROW
            ? 'flex overflow-scroll items-center justify-center flex-grow mt-8'
            : 'mt-8'
        }
      >
        <ul
          onMouseLeave={() => selectedAlbum === null && setMainColor(null)}
          className={
            view === AlbumView.ROW
              ? 'flex overflow-visible items-center justify-center'
              : 'flex flex-wrap'
          }
        >
          {albums.map((album) => (
            <Album album={album} key={album.id} />
          ))}
        </ul>
      </div>
    </MousePositionContext.Provider>
  );
}

export default AlbumsList;
