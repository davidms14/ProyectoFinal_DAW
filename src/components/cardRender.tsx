import '../index.css';
import '../style.css';
import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { getCurrentLanguage } from '../i18n';
import moment from 'moment';

/**
 * @param cardRender - Esta clase funciona como un componente para Tile ya que es la encargada 
 * de contener la infomación que se mostrará en las tarjetas, los datos de los clientes, fechas, muestras
 * de estas... Además tendrá unos iconos que nos permitirá conocer en todo momento el estado de las tarjetas
 * que estamos mostrando. Con estos iconos que ejercen las funciones de botón podremos visualizar un reporte
 * de manera individual, observar las muestras enlazadas a dicho reporte y descargar el reporte seleccionado.
 */

export interface Data {
    id: string;
    reportNumber: string;
    client: string;
    entryDate: Date;
    expectedDate: Date;
    status: string;
    reference: string;
    certificate: string;
}

interface Props {
    data: Data;
}

interface CardRenderState {
    data: Data;
    isLoadSamples: boolean;
    hasMore: boolean;
}

export type CardRenderPropsWithTranslation = Props & WithTranslation;

export class CardRender extends React.Component<CardRenderPropsWithTranslation, CardRenderState> {
    public constructor(props: CardRenderPropsWithTranslation) {
        super(props);

        this.state = {
            data: this.props.data,
            isLoadSamples: false,
            hasMore: true,
        };
    }

    /**
     * 
     * @returns {string} Devuelve string
     * @example
     * //Example funcion
     * @description
     * //Con esta función podemos controlar el estado y saber si
     * se ha acabado de trabajar en un reporte o sigue en proceso. Esto puede saberse grácias a los iconos
     * que nos ayudan a identificarlo.
     * @param {string} status - Hace refencia al estado del reporte.
     * 
     */
    private getStatus(status: string): string {
        if (status === "finalized") {
            /** Tarea finalizada */
            return status = "icon-checkbox-checked iconosTarjetas";
        }
        else {
            /** Tarea por finalizar */
            return status = "icon-hour-glass iconosTarjetas"
        }
    }

    /**
     * @returns {string} Devuelve string
     * @example
     * //Ejemplo funcion
     * @description
     * //Esta función simplemente permite saber el significado del icono que
     * nos indica el estado del reporte. Así al pasar el ratón por encima de este podemos saber 
     * que significa.
     * @param {string} title - Hace refencia al estado del reporte.
     */

    private getTitle(title: string): string {
        if (title === "finalized") {
            return title = this.props.i18n.t('status.finalized');
        }
        else {
            return title = this.props.i18n.t('status.inprogress');
        }
    }

    /**
     * @example
     * //Example funcion
     * @description
     * //La función se encarga de cargar las muestras, también modifica el estado de estas
     * ya que no siempre sacará las mismas, sino que deberá sacar la muestras enlazadas al reporte.
     * @param {boolean} isLoadSample - Controla si las muestras se han cargado
     */

    private getAlert(isLoadSample: boolean): void {
        /*var newState = this.state.data;*/
        this.setState({ /*data: newState,*/ isLoadSamples: isLoadSample });
    }


    public render(): JSX.Element {
        /** Almacena el contenido de la tarjeta, se mostrará información de la tarjeta o las muestras */
        let content = [];


        /** Antes se tomaban las muestras desde otro documento, ahora al ser un campo dentro del actual JSON accedemos a dicho campo
         * y lo metemos en un array. En cada posición se inserta una muestra, estas se separan por comas.
         */
        let references: string[] = this.state.data.reference.split(', ');
        let notEmptyReferences: string[] = references.filter((element: string): boolean => {
            return element !== undefined && element != null && element.trim() !== '';
        });

        /** Este icono nos mostrará las muestras, si estamos en ellas desaparece. */
        const buttonToShowSamples =
            (notEmptyReferences.length > 0 && !this.state.isLoadSamples) ?
                <i title={this.props.i18n.t('icons.samples')} className="icon-file-empty iconosTarjetas"
                    key={'buttonToShowSamples_'.concat(this.state.data.id)}
                    onClick={this.getAlert.bind(this, true)}
                >
                </i>
                :
                null;

        /** Con ese icono podremos visualizar el reporte */
        const buttonToShow =
            this.state.data.certificate === "true" ?
                <i title={this.props.i18n.t('icons.detail')} className="icon-link iconosTarjetas" ></i>
                :
                null;

        /** Con ese icono podremos descargar el reporte */
        const buttonToDownload =
            this.state.data.status === "finalized" ?
                <i title={this.props.i18n.t('icons.download')} className="icon-download3 iconosTarjetas" ></i>
                :
                null;

        /** Si estamos viendo las muestras, para volver a los datos del reporte pulsaremos aqui. */
        const buttonToClose =
            <i title={this.props.i18n.t('icons.cerrar')} className="icon-cross iconoCerrar"
                key={'buttonToCloseSamples_'.concat(this.state.data.id)}
                onClick={this.getAlert.bind(this, false)}
            ></i>;

        /** Contiene los datos a mostrar en la tarjeta */
        if (!this.state.isLoadSamples) {
            if (this.state.data.status === "finalized") {
                moment.locale(getCurrentLanguage());

                content.push(

                    <div key={'div_report_'.concat(this.state.data.id)}>
                        <b title={this.props.i18n.t('home.filters.client')}>{this.props.i18n.t('home.filters.client')}:</b> {this.state.data.client}
                        <br />
                        <b title={this.props.i18n.t('home.filters.entry')}>{this.props.i18n.t('home.filters.finish')}:</b> {moment(this.state.data.entryDate).format('L')}
                        <br />
                        <b title={this.props.i18n.t('home.filters.expected')}>{this.props.i18n.t('home.filters.timed')}:</b> {moment(this.state.data.expectedDate).add(5, 'years').format('L')}
                    </div>
                );
            } else {
                moment.locale(getCurrentLanguage());

                content.push(

                    <div key={'div_report_'.concat(this.state.data.id)}>
                        <b title={this.props.i18n.t('home.filters.client')}>{this.props.i18n.t('home.filters.client')}:</b> {this.state.data.client}
                        <br />
                        <b title={this.props.i18n.t('home.filters.entry')}>{this.props.i18n.t('home.filters.entry')}:</b> {moment(this.state.data.entryDate).format('L')}
                        <br />
                        <b title={this.props.i18n.t('home.filters.expected')}>{this.props.i18n.t('home.filters.expected')}:</b> {moment(this.state.data.expectedDate).format('L')}
                    </div>
                );
            }
        }

        /** Muestras los reportes asociados a la tarjeta*/
        else if (this.state.data.reference.trim() !== '') {
            content.push(buttonToClose);
            references.forEach((element: string, index: number): void => {
                content.push(
                    <div key={'div_reference_'.concat(index.toString())}>
                        <div><b>-</b> {element}</div>
                    </div>
                );
            });
        }

        /** Devuelve la esctrutura de la tarjeta, esta consta de un HEADER donde encontramos el estado y el número de reporte. 
         * Ambas cosas siempre estarán en ese sitio.
         * 
         * Seguidamente, tenemos el apartado de CONTENT, el cual si que varia dependiendo de si estamos mostrando la información
         * de la tarjeta o las muestras.
         * 
         * Para acabar tendriamos un apartado de ACTIONS, este contiene los tres botones de detalles, descarga y muestras y al igual que la cabecera
         * estos siempre ocuparán ese lugar.
          */
        return (
            <div className='e-card'>

                <div className='e-card-header'>
                    <div className='e-card-header-title' title={this.props.i18n.t('home.table.reportNumber')}>
                        <i title={this.getTitle(this.state.data.status)}
                            className={this.getStatus(this.state.data.status)}>
                        </i>{this.state.data.reportNumber}
                    </div>
                </div>

                <div className='e-card-content' style={{ overflowY: 'auto' }}>
                    {content}
                </div>

                <div className='e-card-actions iconos'>
                    {buttonToShow}
                    {buttonToShowSamples}
                    {buttonToDownload}
                </div>
            </div>
        );
    }
}


export default withTranslation()(CardRender);


