import { useState } from 'react';
import dataProvider, { RawAlbumData } from './dataProvider';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    setLoading(true);

    try {
      const response = await dataProvider.getAlbums();
      setData(() =>
        response.feed.entry.map((rawEntry, index: number) =>
          dataMapper(rawEntry, index + 1)
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return { fetchAlbums, loading, data };
};

const dataMapper = (rawData: RawAlbumData, ranking: number): Album => {
  const rawImageData = rawData['im:image'][rawData['im:image'].length - 1];
  return {
    id: rawData.id.attributes['im:id'],
    name: rawData['im:name'].label,
    link: rawData.link.attributes.href,
    image: {
      src: rawImageData.label,
      attributes: rawImageData.attributes,
    },
    category: {
      id: rawData.category.attributes['im:id'],
      label: rawData.category.attributes.label,
    },
    releaseDate: new Date(rawData['im:releaseDate'].label),
    artist: {
      name: rawData['im:artist'].label,
    },
    ranking,
  };
};

export interface Album {
  id: string;
  name: string;
  link: string;
  image: {
    src: string;
    attributes: {
      height: string;
    };
  };
  category: {
    id: string;
    label: string;
  };
  releaseDate: Date;
  artist: {
    name: string;
  };
  ranking: number;
}
