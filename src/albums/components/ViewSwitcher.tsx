import React, { useContext } from 'react';
import PageStateContext, {
  AlbumView,
  OrderBy,
} from '../context/PageStateContext';

function ViewSwitcher() {
  const { setView, setOrder, view } = useContext(PageStateContext);
  const views = [
    { id: AlbumView.ROW, name: 'Color scale', order: OrderBy.DOMINANT_COLOR },
    { id: AlbumView.GRID, name: 'Boring grid', order: OrderBy.RANKING },
  ];

  const switchView = ({ id, order }: { id: AlbumView; order: OrderBy }) => {
    setView(id);
    setOrder(order);
  };

  return (
    <div className="flex justify-center">
      {views.map((v) => (
        <button
          key={v.id}
          className={`text-white text-xl pt-3 pr-3 pl-3 italic ${
            view !== v.id ? 'opacity-50' : ''
          }`}
          onClick={() => switchView(v)}
        >
          {v.name}
        </button>
      ))}
    </div>
  );
}

export default ViewSwitcher;
