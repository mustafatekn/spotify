import React from 'react';
import '../styles/_discover-item.scss';

//TODO: Fix types here
interface IDiscoverItemProps {
  images: Array<{ height?: number, width?: number, url: string }>;
  name: string;
  icons: Array<{ height?: number, width?: number, url: string }>
}

export default class DiscoverItem extends React.Component<IDiscoverItemProps> {
  render = () => {
    const { images, name, icons } = this.props;

    return (
      <div className="discover-item animate__animated animate__fadeIn">
        <div
          className="discover-item__art"
          style={{ backgroundImage: `url(${images[0].url || icons[0].url})` }}
        />
        <p className="discover-item__title">{name}</p>
      </div>
    );
  }
}
