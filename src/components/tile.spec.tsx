import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Tile, State } from './tile';
import { Data } from './cardRender';
import { WithTranslation } from 'react-i18next';
import i18n from '../i18n';

/**
 * Documento para el testo de componente, en este caso para el código de Tile.tsx
 */

/**
  * Primer test: test de interfaz o visual, enfocado a comprobar la parte del código que se ve en el navegador mediante un snapshot
  */
 
describe('components/tile tests', () => {
    it('should render as expected when passing required properties', () => {
        // Arrange
            //Aquí se realiza la toma de datos con los que trabajaremos en este test
        const props: WithTranslation = {
            i18n: i18n,
        } as WithTranslation;

        // Act
            //Indicamos sobre que funciones y/o apartados trabajará la prueba
        const component = mount(
            <Tile {...props} />
        );

        // Assert
            //Aquí indicamos el resultado que queremos obtener, en este caso un snapshot
        expect(component.debug()).toMatchSnapshot();
    });

    /**
     * Segundo test: test para comprobar si una vez se han cargado todos los elementos, el programa deja de cargarlos.
     */
    it('should stop charging pages', () => {

        // Arrange
        const props: WithTranslation = {
            i18n: i18n,
        } as WithTranslation;

        // Act
        const component = mount(
            <Tile {...props} />
        );

        // Assert

        component.find('.newCard').simulate('click');
        debugger;
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');
        component.find('InfiniteScroll').simulate('scroll');

    });

    /**
     * Tercer test: test para comprobar que se cargan todos los datos.
     */
    it('should enter in cargaPags', () => {

        // Arrange
        const props: WithTranslation = {
            i18n: i18n,
        } as WithTranslation;

        // Act
        const component = mount(
            <Tile {...props} />
        );

        // Assert
        component.find('.newCard').simulate('click');
        debugger;

    });
});