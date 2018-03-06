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
  getArticles(articles) {
    return articles.map((element, index) => {
      const articleProps = {
        key: index.toString(),
        titulo: element.titulo,
        descripcion: element.descripcion
      };
      return <Article  {...articleProps} />
    });
  };

  render() {
    const { title, articles } = this.props;

    return (
      <section {...options}>
        <h2>{title}</h2>
        {this.getArticles(articles)}
      </section>
    );
  }
}
