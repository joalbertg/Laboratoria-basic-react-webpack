import React from 'react';

const options = {
  style: {
    width: '25%',
    float: 'right'
  }
};

export default class Aside extends React.Component {
  constructor({ links, title }) {
    super();

    this.title = title;
    this.links = links;

    this.listLinks = this.getLinks();
  };

  getLinks() {
    return this.links.map((element, index) => (
      <li key={index}>
        <a href={element.href}>{element.texto}</a>
      </li>)
    );
  };

  render() {
    return (
      <aside {...options}>
        <h4>{this.title}</h4>
        {this.listLinks}
      </aside>
    );
  }
}
