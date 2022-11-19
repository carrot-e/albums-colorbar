import { render, screen } from '@testing-library/react';
import React from 'react';
import { Album as AlbumInterface } from './useAlbums';
import AlbumsList from './AlbumsList';

describe('<AlbumsList />', () => {
  test('renders <AlbumsList />', () => {
    const component = render(<AlbumsList albums={[album]} loading={false} />);
    expect(component).toMatchSnapshot();
  });

  test.each([{ albums: [] }, { albums: [album] }])(
    'renders <AlbumsList /> in loading state: %#',
    ({ albums }) => {
      render(<AlbumsList albums={albums} loading={true} />);
      expect(screen.queryByText('Loading...')).toBeInTheDocument();
    }
  );

  test('renders <AlbumsList /> in empty state', () => {
    render(<AlbumsList albums={[]} loading={false} />);
    expect(screen.queryByText('No albums found')).toBeInTheDocument();
  });
});

const album: AlbumInterface = {
  id: '1640572729',
  name: 'Faith in the Future (Deluxe)',
  link: 'https://music.apple.com/us/album/faith-in-the-future-deluxe/1640572729?uo=2',
  image: {
    src: 'https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/59/f9/f3/59f9f3b6-e815-99fd-a359-10fec504a5e3/4050538836639.jpg/170x170bb.png',
    attributes: { height: '170' },
  },
  category: {
    id: '14',
    label: 'Pop',
  },
  releaseDate: new Date('2022-10-01'),
  artist: {
    name: 'Louis Tomlinson',
  },
  ranking: 3,
};
