import React from 'react';
import { render, screen } from '@testing-library/react';
import { format, subDays } from 'date-fns';
import Album from './Album';

const album = {
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

describe('<Album />', () => {
  test('renders <Album />', () => {
    const component = render(<Album album={album} />);
    expect(component).toMatchSnapshot();
  });

  test('renders <Album /> released today', () => {
    album.releaseDate = new Date();
    render(<Album album={album} />);

    expect(screen.queryByText('Today')).toBeInTheDocument();
    expect(screen.queryByText('day ago')).not.toBeInTheDocument();
  });

  test('renders <Album /> released during the week', () => {
    album.releaseDate = subDays(new Date(), 6);
    render(<Album album={album} />);

    expect(screen.queryByText('6 days ago')).toBeInTheDocument();
  });

  test('renders <Album /> released more than a week ago', () => {
    album.releaseDate = subDays(new Date(), 7);
    render(<Album album={album} />);

    expect(screen.queryByText('7 days ago')).not.toBeInTheDocument();
    expect(
      screen.queryByText(format(album.releaseDate, 'dd MMMM yyyy'))
    ).toBeInTheDocument();
  });
});
