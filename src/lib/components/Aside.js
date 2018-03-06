import React from 'react';

const options = {
  style: {
    width: '25%',
    float: 'right'
  }
};

export default class Aside extends React.Component {
  getLinks(links) {
    return links.map((element, index) => (
      <li key={index}>
        <a href={element.href}>{element.texto}</a>
      </li>)
    );
  };

  render() {
    const { links, title } = this.props;

    return (
      <aside {...options}>
        <h4>{title}</h4>
        {this.getLinks(links)}
      </aside>
    );
  }
}
