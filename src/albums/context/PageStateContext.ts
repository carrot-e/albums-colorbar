import { createContext, Dispatch, SetStateAction } from 'react';

export enum OrderBy {
  RANKING = 'ranking',
  DOMINANT_COLOR = 'dominant-color',
}

export enum AlbumView {
  GRID = 'grid',
  ROW = 'row',
}

const PageStateContext = createContext<{
  mainColor: [number, number, number] | null;
  setMainColor: Dispatch<SetStateAction<[number, number, number] | null>>;
  view: AlbumView;
  setView: Dispatch<SetStateAction<AlbumView>>;
  order: OrderBy;
  setOrder: Dispatch<SetStateAction<OrderBy>>;
  selectedAlbum: string | null;
  setSelectedAlbum: Dispatch<SetStateAction<string | null>>;
}>({
  view: AlbumView.GRID,
  setView() {
    return;
  },
  order: OrderBy.RANKING,
  setOrder() {
    return;
  },
  selectedAlbum: null,
  setSelectedAlbum() {
    return;
  },
  mainColor: null,
  setMainColor() {
    return;
  },
});

export default PageStateContext;
