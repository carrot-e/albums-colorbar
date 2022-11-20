import React, { useEffect, useMemo, useState } from 'react';
import Drawer from 'react-modern-drawer';
import useAlbums, { Album as AlbumInterface } from '../hooks/useAlbums';
import AlbumsList from './AlbumsList';
import Search from './Search';
import '../styles/albums.css';
import 'react-modern-drawer/dist/index.css';
import AlbumDetails from './AlbumDetails';
import ViewSwitcher from './ViewSwitcher';
import { RGBToHSB } from '../../utils/colors';
import PageStateContext, {
  AlbumView,
  OrderBy,
} from '../context/PageStateContext';

const orderByColor = (albums: AlbumInterface[]) => {
  albums.sort((a, b) => {
    const [aHue] = RGBToHSB(...a.dominantColor);
    const [bHue] = RGBToHSB(...b.dominantColor);
    return aHue - bHue;
  });
};

const orderByRanking = (albums: AlbumInterface[]) => {
  albums.sort((a, b) => {
    return a.ranking - b.ranking;
  });
};

function AlbumsPage() {
  const { fetchAlbums, loading, data } = useAlbums();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<OrderBy>(OrderBy.DOMINANT_COLOR);
  const [view, setView] = useState<AlbumView>(AlbumView.ROW);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [mainColor, setMainColor] = useState<null | [number, number, number]>(
    null
  );
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

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
    if (order === OrderBy.DOMINANT_COLOR) {
      orderByColor(data);
    } else if (order === OrderBy.RANKING) {
      orderByRanking(data);
    }

    return data.filter(
      (album) =>
        album.name.toLowerCase().includes(query) ||
        album.artist.name.toLowerCase().includes(query)
    );
  }, [data, searchQuery, order]);

  if (!initialized) {
    return <div className="bg-slate-900 min-h-screen min-w-full" />;
  }

  const onDrawerClose = () => {
    setSelectedAlbum(null);
    setMainColor(null);
  };

  return (
    <PageStateContext.Provider
      value={{
        mainColor,
        setMainColor,
        order,
        setOrder,
        view,
        setView,
        selectedAlbum,
        setSelectedAlbum,
      }}
    >
      <div
        className={`container bg-gray-900 min-h-screen min-w-full transition-colors flex flex-col`}
        style={
          mainColor !== null
            ? { backgroundColor: `rgb(${mainColor.join(',')})` }
            : {}
        }
      >
        <header>
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-white pt-20 text-center italic font-serif">
            Best Albums
          </h1>
          <h3 className="text-3xl sm:text-5xl md:text-5xl text-white mb-5 text-center italic font-serif">
            of today
          </h3>
          <Search searchQuery={searchQuery} onChange={setSearchQuery} />
          <ViewSwitcher />
        </header>
        <AlbumsList albums={albums} loading={loading} />
        <Drawer
          style={{ width: 500 }}
          className="max-w-full overflow-scroll"
          open={selectedAlbum !== null}
          direction={'right'}
          onClose={onDrawerClose}
        >
          <AlbumDetails
            album={data.find((a) => a.id === selectedAlbum)!}
            onClose={onDrawerClose}
          />
        </Drawer>
      </div>
    </PageStateContext.Provider>
  );
}

export default AlbumsPage;
