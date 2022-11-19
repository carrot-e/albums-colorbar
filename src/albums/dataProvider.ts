export default {
  getAlbums(): Promise<BasicResponse<RawAlbumData>> {
    return fetch(
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    ).then((r) => r.json());
  },
};

interface BasicResponse<E> {
  feed: {
    entry: E[];
  };
}

export interface RawAlbumData {
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
