import React from 'react';

import Article from './Article';

const options = {
  style: {
    width: '70%',
    float: 'left'
  },
  id: 'main'
};

export default class Section extends React.Component {
  constructor({ title, articles }) {
    super();

    this.title = title;
    this.articles = articles;

    this.listArticles = this.getArticles();
  };

  getArticles() {
    return this.articles.map((element, index) => {
      const articleProps = {
        key: index.toString(),
        titulo: element.titulo,
        descripcion: element.descripcion
      };
      return <Article  {...articleProps} />
    });
  };

  render() {
    return (
      <section {...options}>
        <h2>{this.title}</h2>
        {this.listArticles}
      </section>
    );
  }
}
