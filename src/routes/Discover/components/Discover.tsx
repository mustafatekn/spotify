import { Component } from 'react';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import Modal from '../components/Modal';

//TODO: Fix `any` types here

interface IDiscoverProps { }

interface IDiscoverState {
  newReleases: Array<NewRelease>;
  playlists: Array<Playlist>;
  categories: Array<Category>;
  showModal: boolean;
}

type Image = {
  height?: number;
  url: string;
  width?: number;
}

type ExternalUrls = {
  spotify: string;
}

type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

type Tracks = {
  href: string;
  total: number;
}


type Icon = {
  height: number;
  url: string;
  width: number;
}


export interface NewRelease {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Category {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: any;
  public?: any;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      showModal: false
    };
  }

  //TODO: Handle APIs

  async componentDidMount() {

    const token: string | undefined = this.getToken();

    if (token) {
      try {
        const [newReleases, playlists, categories] = await Promise.all([this.getAlbums(token), this.getPlaylists(token), this.getCategories(token)]);
        this.setState({ newReleases: newReleases.data.albums.items, playlists: playlists.data.playlists.items, categories: categories.data.categories.items })
      } catch (error: any) {
        if (error.message === 'Request failed with status code 401') {
          this.setState({ showModal: true });
        } else {
          alert(error.message);
        }
      }
    } else {
      this.setState({ showModal: true });
    }

  }

  getToken() {
    const params: string = window.location.href.split('access_token=')[1]
    let token: string | undefined;
    if (params) {
      token = params.split('&')[0];
    }
    return token;
  }

  getAlbums(token: string) {

    return axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_SPOTIFY_BASE_URL!}/browse/new-releases?limit=50`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  }

  getPlaylists(token: string) {
    return axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_SPOTIFY_BASE_URL!}/browse/featured-playlists`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  }

  getCategories(token: string) {
    return axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_SPOTIFY_BASE_URL!}/browse/categories`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8"
      }
    });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <Modal show={this.state.showModal} />
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
