import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
      ).then((r) => r.json());
      setData(() =>
        response.feed.entry.map((rawEntry: RawAlbumData, index: number) =>
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

interface RawAlbumData {
  'im:name': { label: string };
  'im:image': { label: string; attributes: { height: string } }[];
  'im:itemCount': { label: string };
  'im:price': {
    label: string;
    attributes: { amount: string; currency: string };
  };
  'im:contentType': {
    'im:contentType': { attributes: { term: string; label: string } };
    attributes: { term: string; label: string };
  };
  rights: { label: string };
  title: { label: string };
  link: { attributes: { rel: string; type: string; href: string } };
  id: { label: string; attributes: { 'im:id': string } };
  'im:artist': { label: string; attributes: { href: string } };
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  'im:releaseDate': { label: string; attributes: { label: string } };
}
