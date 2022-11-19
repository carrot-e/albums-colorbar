import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AlbumsPage from './AlbumsPage';
import { act } from 'react-dom/test-utils';
import React from 'react';

jest.mock('./dataProvider', () => ({
  getAlbums: jest.fn(),
}));
import dataProvider from './dataProvider';

describe('<AlbumsPage />', () => {
  test('renders <AlbumsPage /> and searching', async () => {
    const getAlbumsMock = jest.fn().mockResolvedValue(response);
    dataProvider.getAlbums = getAlbumsMock;
    render(<AlbumsPage />);
    expect(getAlbumsMock).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('Sonder')).toBeInTheDocument();
      expect(screen.getByText('Funny Girl')).toBeInTheDocument();
    });

    const search = await screen.findByPlaceholderText('Search title or artist');

    act(() => {
      fireEvent.change(search, { target: { value: 'girl' } });
      expect(screen.queryByText('Sonder')).not.toBeInTheDocument();
      expect(screen.queryByText('Funny Girl')).toBeInTheDocument();
      expect(screen.queryByText('No albums found')).not.toBeInTheDocument();
    });

    act(() => {
      fireEvent.change(search, { target: { value: 'sonn' } });
      expect(screen.queryByText('Sonder')).not.toBeInTheDocument();
      expect(screen.queryByText('Funny Girl')).not.toBeInTheDocument();
      expect(screen.queryByText('No albums found')).toBeInTheDocument();
    });
  });

  test('renders <AlbumsPage /> when dataProvider throws an error', async () => {
    const getAlbumsMock = jest
      .fn()
      .mockRejectedValue({ error: 'Error occurred' });
    global.console.error = jest.fn();
    dataProvider.getAlbums = getAlbumsMock;
    await act(async () => {
      render(<AlbumsPage />);
    });

    expect(getAlbumsMock).toHaveBeenCalledTimes(1);

    act(() => {
      expect(global.console.error).toHaveBeenCalledTimes(1);
    });
  });
});

const response = {
  feed: {
    author: {
      name: { label: 'iTunes Store' },
      uri: { label: 'http://www.apple.com/itunes/' },
    },
    entry: [
      {
        'im:name': { label: 'Sonder' },
        'im:image': [
          {
            label:
              'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/19/b2/e9/19b2e92e-2d5a-80ac-e839-bdef51bb6106/22UMGIM62695.rgb.jpg/55x55bb.png',
            attributes: { height: '55' },
          },
          {
            label:
              'https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/19/b2/e9/19b2e92e-2d5a-80ac-e839-bdef51bb6106/22UMGIM62695.rgb.jpg/60x60bb.png',
            attributes: { height: '60' },
          },
          {
            label:
              'https://is2-ssl.mzstatic.com/image/thumb/Music112/v4/19/b2/e9/19b2e92e-2d5a-80ac-e839-bdef51bb6106/22UMGIM62695.rgb.jpg/170x170bb.png',
            attributes: { height: '170' },
          },
        ],
        'im:itemCount': { label: '11' },
        'im:price': {
          label: '$9.99',
          attributes: { amount: '9.99', currency: 'USD' },
        },
        'im:contentType': {
          'im:contentType': { attributes: { term: 'Album', label: 'Album' } },
          attributes: { term: 'Music', label: 'Music' },
        },
        rights: {
          label:
            'Riggins Recording/Interscope Records/Island Records; ℗ 2022 Riggins Recording, under exclusive license to Island Records, a division of Universal Music Operations Limited and Interscope Records, a division of UMG Recordings Inc.',
        },
        title: { label: 'Sonder - Dermot Kennedy' },
        link: {
          attributes: {
            rel: 'alternate',
            type: 'text/html',
            href: 'https://music.apple.com/us/album/sonder/1631859030?uo=2',
          },
        },
        id: {
          label: 'https://music.apple.com/us/album/sonder/1631859030?uo=2',
          attributes: { 'im:id': '1631859030' },
        },
        'im:artist': {
          label: 'Dermot Kennedy',
          attributes: {
            href: 'https://music.apple.com/us/artist/dermot-kennedy/376564133?uo=2',
          },
        },
        category: {
          attributes: {
            'im:id': '14',
            term: 'Pop',
            scheme: 'https://music.apple.com/us/genre/music-pop/id14?uo=2',
            label: 'Pop',
          },
        },
        'im:releaseDate': {
          label: '2022-11-18T00:00:00-07:00',
          attributes: { label: 'November 18, 2022' },
        },
      },
      {
        'im:name': { label: 'Funny Girl' },
        'im:image': [
          {
            label:
              'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/fa/4b/5a/fa4b5af3-de1d-9bb5-4a66-508aafb68976/196589677525.jpg/55x55bb.png',
            attributes: { height: '55' },
          },
          {
            label:
              'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/fa/4b/5a/fa4b5af3-de1d-9bb5-4a66-508aafb68976/196589677525.jpg/60x60bb.png',
            attributes: { height: '60' },
          },
          {
            label:
              'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/fa/4b/5a/fa4b5af3-de1d-9bb5-4a66-508aafb68976/196589677525.jpg/170x170bb.png',
            attributes: { height: '170' },
          },
        ],
        'im:itemCount': { label: '22' },
        'im:price': {
          label: '$10.99',
          attributes: { amount: '10.99', currency: 'USD' },
        },
        'im:contentType': {
          'im:contentType': { attributes: { term: 'Album', label: 'Album' } },
          attributes: { term: 'Music', label: 'Music' },
        },
        rights: {
          label:
            '℗ 2022 Accidental Jacket Entertainment, under exclusive license to Masterworks Broadway, a label of Sony Music',
        },
        title: {
          label:
            'Funny Girl (New Broadway Cast Recording) - New Broadway Cast of Funny Girl',
        },
        link: {
          attributes: {
            rel: 'alternate',
            type: 'text/html',
            href: 'https://music.apple.com/us/album/funny-girl-new-broadway-cast-recording/1654619736?uo=2',
          },
        },
        id: {
          label:
            'https://music.apple.com/us/album/funny-girl-new-broadway-cast-recording/1654619736?uo=2',
          attributes: { 'im:id': '1654619736' },
        },
        'im:artist': {
          label: 'New Broadway Cast of Funny Girl',
          attributes: {
            href: 'https://music.apple.com/us/artist/new-broadway-cast-of-funny-girl/1654046911?uo=2',
          },
        },
        category: {
          attributes: {
            'im:id': '16',
            term: 'Soundtrack',
            scheme:
              'https://music.apple.com/us/genre/music-soundtrack/id16?uo=2',
            label: 'Soundtrack',
          },
        },
        'im:releaseDate': {
          label: '2022-11-20T00:00:00-07:00',
          attributes: { label: 'November 20, 2022' },
        },
      },
    ],
    updated: { label: '2022-11-19T06:05:49-07:00' },
    rights: { label: 'Copyright 2008 Apple Inc.' },
    title: { label: 'iTunes Store: Top Albums' },
    icon: { label: 'http://itunes.apple.com/favicon.ico' },
    link: [
      {
        attributes: {
          rel: 'alternate',
          type: 'text/html',
          href: 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewTop?cc=us&id=1&popId=11',
        },
      },
      {
        attributes: {
          rel: 'self',
          href: 'https://mzstoreservices-int-st.itunes.apple.com/us/rss/topalbums/limit=2/json',
        },
      },
    ],
    id: {
      label:
        'https://mzstoreservices-int-st.itunes.apple.com/us/rss/topalbums/limit=2/json',
    },
  },
};
