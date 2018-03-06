// import React, { Component } from 'react';
// o podemos solo usar React y al extender la clase
// se llama con React.Component
import React from 'react';

import Header from './components/Header';
import Section from './components/Section';
import Aside from './components/Aside';

// ... aqui va la definicion de tu componente
// y los `pageProps` por defecto

const pageProps = {
  headerTitulo: 'Getting Started',
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

// exportamos por defecto el componente `Page`
export default class Page extends React.Component {
  setHeader({ headerTitulo, headerDescripcion }) {
    this.headerProps = {
      titulo: headerTitulo,
      parrafo: headerDescripcion
    };
  }

  setSection({ mainSectionTitulo, mainSectionArticles }) {
    this.objSection = {
      title: mainSectionTitulo,
      articles: mainSectionArticles
    }
  }

  setAside({ asideTitulo, asideLinks }) {
    this.objAside = {
      title: asideTitulo,
      links: asideLinks
    };
  }

  render() {
    const {
      headerTitulo,
      headerDescripcion,
      mainSectionTitulo,
      mainSectionArticles,
      asideTitulo,
      asideLinks } = this.props;

    this.setHeader({ headerTitulo, headerDescripcion });
    this.setSection({ mainSectionTitulo, mainSectionArticles });
    this.setAside({ asideTitulo, asideLinks });

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
