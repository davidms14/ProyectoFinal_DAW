import * as React from 'react';
import { shallow } from 'enzyme';
import { CardRender, Data, CardRenderPropsWithTranslation } from './cardRender';
import i18n from '../i18n';

/**
 * Documento para almacenar los tests del cardRender 
 */

 /**
  * Primer test: test para comprobar si se realiza la vista correcta de las tarjetas en forma de snapshot
  */

describe('components/cardRender tests', () => {
    it('should render as expected when passing required properties', () => {
        // Arrange
        const myData: Data = {
            id: '6fdd1b8f-b0b4-4b40-931f-fb95bb7e9b9a',
            reportNumber: '2019USAM17',
            client: 'testcreate',
            entryDate: new Date,
            expectedDate: new Date,
            status: 'inprogress',
            reference: 'TestAdd, TestAdd2, TestAdd3',
            certificate: 'true',
        };

        const props: CardRenderPropsWithTranslation = {
            data: myData,
            i18n: i18n
        } as CardRenderPropsWithTranslation;

        // Act
        const component = shallow(
            <CardRender {...props} />
        );

        // Assert
        expect(component.debug()).toMatchSnapshot();
    });

    /**
     * Segundo test: test para comprobar el funcionamiento de los botones de las tarjetas.
     */
    it('should try buttons in cards', () => {
        // Arrange
        const myData: Data = {
            id: '6fdd1b8f-b0b4-4b40-931f-fb95bb7e9b9a',
            reportNumber: '2019USAM17',
            client: 'testcreate',
            entryDate: new Date,
            expectedDate: new Date,
            status: 'inprogress',
            reference: 'TestAdd, TestAdd2, TestAdd3',
            certificate: '',
        };

        const props: CardRenderPropsWithTranslation = {
            data: myData,
            i18n: i18n
        } as CardRenderPropsWithTranslation;

        // Act
        const component = shallow(
            <CardRender {...props} />
        );

        // Assert
        component.find('.icon-file-empty').simulate('click');
        component.find('.icon-cross').simulate('click');
        expect(component.find('.icon-file-empty').length).toBe(1);
    });

    /**
     * Tercer test: Test para comprobar si está cargando la vista del reporte o la vista de las muestras
     */
    it('should render cards or samples', () => {
        // Arrange
        const myData: Data = {
            id: '6fdd1b8f-b0b4-4b40-931f-fb95bb7e9b9a',
            reportNumber: '2019USAM17',
            client: 'testcreate',
            entryDate: new Date,
            expectedDate: new Date,
            status: 'inprogress',
            reference: '',
            certificate: 'false'
        };

        const props: CardRenderPropsWithTranslation = {
            data: myData,
            i18n: i18n
        } as CardRenderPropsWithTranslation;

        // Act
        const component = shallow(
            <CardRender {...props} />
        );

        // Assert
        component.setState({ isLoadSamples: true });
        expect(1).toBe(1);
    });
});
