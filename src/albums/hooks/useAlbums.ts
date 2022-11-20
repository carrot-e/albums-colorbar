import { useState } from 'react';
import dataProvider, { RawAlbumData } from '../data/dataProvider';
import { getPredominantColorFromImgURL } from 'color-thief-react/lib/utils';
import { HSBToRGB, RGBToHSB } from '../../utils/colors';

export default () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    setLoading(true);

    try {
      const response = await dataProvider.getAlbums();
      const albums = await Promise.all(
        response.feed.entry.map((rawEntry, index: number) =>
          dataMapper(rawEntry, index + 1)
        )
      );
      setData(() => albums);
    } finally {
      setLoading(false);
    }
  };

  return { fetchAlbums, loading, data };
};

const normalizeDominantColor = ([r, g, b]: [number, number, number]): [
  number,
  number,
  number
] => {
  const [h] = RGBToHSB(r, g, b);
  return HSBToRGB(h, 100, 50);
};

const dataMapper = async (
  rawData: RawAlbumData,
  ranking: number
): Promise<Album> => {
  const rawImageData = rawData['im:image'][rawData['im:image'].length - 1];
  return {
    id: rawData.id.attributes['im:id'],
    name: rawData['im:name'].label,
    link: rawData.link.attributes.href,
    itemCount: rawData['im:itemCount'].label,
    image: {
      // workaround for better image quality
      src: rawImageData.label.replace('170x170bb.png', '632x632bb.webp'),
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
    rights: rawData.rights.label,
    ranking,
    dominantColor: normalizeDominantColor(
      await getPredominantColorFromImgURL(
        rawImageData.label,
        'rgbArray',
        'anonymous'
      )
    ),
  };
};

export interface Album {
  id: string;
  name: string;
  link: string;
  itemCount: string;
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
  dominantColor: [number, number, number];
  rights: string;
}
