// import React, { Component } from 'react';
// o podemos solo usar React y al extender la clase
// se llama con React.Component
import React from 'react';

// ... aqui va la definicion de tu componente
// y los `pageProps` por defecto

const pageProps = {
  headerTitulo: 'Getting StartedXX',
  headerDescripcion: 'Descripcion',
  mainSectionTitulo: 'Main Section',
  mainSectionArticles: [
    { titulo: 'Titulo 1', descripcion: 'Descripcion 1' },
    { titulo: 'Titulo 2', descripcion: 'Descripcion 2' },
    { titulo: 'Titulo 3', descripcion: 'Descripcion 3' }
  ],
  asideTitulo: 'Links',
  asideLinks: [
    { href: '#', texto: 'Link 1' },
    { href: '#', texto: 'Link 2' },
    { href: '#', texto: 'Link 3' },
    { href: '#', texto: 'Link 4' },
    { href: '#', texto: 'Link 5' }
  ],
};

const Header = ({ titulo, parrafo }) => (
  <header>
    <h1>{titulo}</h1>
    <p>{parrafo}</p>
  </header>
);

const Article = ({ titulo, descripcion }) => (
  <article>
    <h3>{titulo}</h3>
    <p>{descripcion}</p>
    <hr />
  </article>
);

const Section = ({ title, articles }) => {
  const options = {
    style: {
      width: '70%',
      float: 'left'
    },
    id: 'main'
  };

  const listArticles = articles.map((element, index) => {
    const articleProps = {
      key: index.toString(),
      titulo: element.titulo,
      descripcion: element.descripcion
    };
    return <Article  {...articleProps} />
  });

  return (
    <section {...options}>
      <h2>{title}</h2>
      {listArticles}
    </section>
  );
};

const Aside = ({ links, title }) => {
  const options = {
    style: {
      width: '25%',
      float: 'right'
    }
  };

  const listLinks = links.map((element, index) => (
    <li key={index}>
      <a href={element.href}>{element.texto}</a>
    </li>)
  );

  return (
    <aside {...options}>
      <h4>{title}</h4>
      {listLinks}
    </aside>);
};

// exportamos por defecto el componente `Page`
export default class Page extends React.Component {
  constructor({ headerTitulo, headerDescripcion, mainSectionTitulo, mainSectionArticles, asideTitulo, asideLinks }) {
    super();

    this.headerProps = {
      titulo: headerTitulo,
      parrafo: headerDescripcion
    };

    this.objSection = {
      title: mainSectionTitulo,
      articles: mainSectionArticles
    };

    this.objAside = {
      title: asideTitulo,
      links: asideLinks
    };
  };

  render() {
    return (
      <div>
        <Header {...this.headerProps} />
        <Section {...this.objSection} />
        <Aside {...this.objAside} />
      </div>
    );
  }
};

// exportamos las propiedades dinámicas por defecto de la página
// con el nombre "defaultPageProps"
export const defaultPageProps = pageProps;

// exportamos por defecto el componente `Page`
// export default Page;
// o podemos agregar export default directamente antes de definir la clase.
