import React, { createRef, useContext, useEffect, useState } from 'react';
import { Album as AlbumInterface } from '../hooks/useAlbums';
import MousePositionContext from '../context/MousePositionContext';
import PageStateContext from '../context/PageStateContext';

function AlbumInRow({ album }: { album: AlbumInterface }) {
  const mousePosition = useContext(MousePositionContext);
  const { setMainColor, setSelectedAlbum, selectedAlbum } =
    useContext(PageStateContext);
  const [hover, setHover] = useState<boolean>(false);
  const li = createRef<HTMLLIElement>();

  const applyMousePosition = () => {
    if (li.current === null) {
      return;
    }

    if (!mousePosition) {
      return;
    }

    if (selectedAlbum !== null) {
      return;
    }

    const liBoundingRect = li.current.getBoundingClientRect();

    if (
      mousePosition.clientX > liBoundingRect.x &&
      mousePosition.clientX < liBoundingRect.x + liBoundingRect.width &&
      mousePosition.clientY > liBoundingRect.y &&
      mousePosition.clientY < liBoundingRect.height + liBoundingRect.y
    ) {
      setHover(true);
      setMainColor(album.dominantColor);
      return;
    }

    setHover(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', applyMousePosition, true);

    return () => {
      window.removeEventListener('scroll', applyMousePosition, true);
    };
  });

  useEffect(() => applyMousePosition(), [mousePosition]);

  return (
    <li
      ref={li}
      className={`row-item flex-shrink-0 ${hover && 'hovered'}`}
      onClick={() => setSelectedAlbum(album.id)}
      style={{
        backgroundColor: `rgb(${album.dominantColor.join(',')})`,
      }}
    >
      <div
        className="w-full h-full bg-center opacity-80 bg-cover"
        style={{ backgroundImage: `url('${album.image.src}')` }}
      ></div>
    </li>
  );
}

export default AlbumInRow;
