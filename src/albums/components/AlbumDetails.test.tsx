import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AlbumDetails from './AlbumDetails';
import { Album as AlbumInterface } from '../hooks/useAlbums';
import { act } from 'react-dom/test-utils';

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
  dominantColor: [0, 0, 0],
  rights: 'This Compilation ℗ 2013 Capitol Records, LLC',
  itemCount: '15',
};

describe('<AlbumDetails />', () => {
  test('renders <AlbumDetails />', async () => {
    const onClose = jest.fn();
    const component = render(<AlbumDetails album={album} onClose={onClose} />);
    expect(component).toMatchSnapshot();

    const close = await screen.findByText('Close');

    act(() => {
      fireEvent.click(close);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
