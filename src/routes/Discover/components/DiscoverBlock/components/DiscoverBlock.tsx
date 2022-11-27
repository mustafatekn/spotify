import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';
import { NewRelease, Category, Playlist } from '../../Discover';
//TODO: Fix types here

type IsNegative = {
  isNegative?: boolean
}

const scrollContainer = (id: string, { isNegative }: IsNegative = {}) => {
  return () => {
    const scrollableContainer: HTMLElement | null = document.getElementById(id);

    const amount = isNegative ? -scrollableContainer!.offsetWidth : scrollableContainer!.offsetWidth;

    scrollableContainer!.scrollLeft = scrollableContainer!.scrollLeft + amount;
  };
}

interface IDiscoverBlockProps {
  text: string;
  id: string;
  data: Array<NewRelease> | Array<Category> | Array<Playlist>;
  imagesKey: string;
}

export default class DiscoverBlock extends React.Component<IDiscoverBlockProps> {
  static defaultProps = {
    imagesKey: "images"
  }
  render = () => {
    const { text, id, data, imagesKey } = this.props;
    console.log(data);

    return (
      <div className="discover-block">
        <div className="discover-block__header">
          <h2>{text}</h2>
          <span />
          {
            data.length ? (
              <div className="animate__animated animate__fadeIn">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={scrollContainer(id, { isNegative: true })}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={scrollContainer(id)}
                />
              </div>
            ) : null
          }
        </div>
        <div className="discover-block__row" id={id}>
          {data.map(({ [imagesKey]: images, name, icons }: any) => (
            <DiscoverItem key={name} images={images} name={name} icons={icons} />
          ))}
        </div>
      </div>
    );
  }
}
