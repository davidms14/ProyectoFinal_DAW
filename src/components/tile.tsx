import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { serverData as serverAllData } from '../data-source';
import { Data } from './cardRender';
import CardRender from './cardRender';
import { withTranslation, WithTranslation } from 'react-i18next';

/**
 * @param Tile - El Tile contiene todos los reportes alojados a su vez en un contenedor.
 * Está conectada con el componente de cardRender.
 * 
 * Primero encontramos las funciones para tomar los datos de las tarjetas de lo que sería 
 * el servidor y la función para cargar las "páginas" con un número determinado de
 * componentes.
 * 
 * Tras el render que será lo que muestre la vista de nuestro componente, encontramos 
 * los valores que hacen referecia al componente del Scroll, este nos permite cargar datos
 * automáticamente sin la necesidad de estar continuamente pulsando un botón para cargar más reportes.
 * 
 * Para finalizar tenemos la estructura del contenedor que almacenará las tarjetas con sus respectivos
 * datos.
 */

export interface State {
    /** Cantidad e Informes almacenados */
    reports: Data[];
    /** Si quedan informes por ser almacenados (están en el servidor) */
    hasMore: boolean;
}

export class Tile extends React.PureComponent<WithTranslation, State> {

    /** Con ella se controla cual va a ser la página en la cual se empezarán a incluir reportes. */
    public nextPage: number = 0;
    /** Se encarga de almacenar los datos que vienen del serverData para poder trabajar con ellos. */
    public cardBook: any = serverAllData;

    public constructor(props: any) {
        super(props);

        this.fetchMoreData = this.fetchMoreData.bind(this);

        this.state = {
            reports: [],
            hasMore: true
        };
    }

    /**
     * @returns {Function} Funcion
     * @example
     * // Ejemplo funcion
     * @description
     * // Simula la obtención de datos del Servidor.
     * @param {number} skip - La página que se quiere cargar (se empieza por 0) 
     * @param {number} top - El numero de tarjetas que se mostraran por cada página.
     * 
     */
    private getCardsFromServer(skip: number, top: number): Data[] {
        let length: number = this.cardBook["@odata.count"];
        let startIndex: number = (skip) * top;
        let endIndex: number = startIndex + top;

        if (endIndex <= length + top) {
            return this.cardBook.value.slice(startIndex, endIndex);
        }
        else {
            return [];
        }

    }

    /** 
     * @example
     * //Example function
     * @description
     * // Esta función se encarga de colocar X reportes (los que nosotros queramos mostrar en cada página).
     * Una vez mostrados los primeros, cambiará de página y llenará esta nuevamente con el numero de 
     * reportes que se haya acordado.
     */
    private cargaPags(): void {
        let newCards: Data[] = this.getCardsFromServer(this.nextPage, 8);
        if (newCards.length === 0) {
            this.setState({ hasMore: false });
        } else {
            this.nextPage++;
            let showedCard: Data[] = [];
            this.state.reports.forEach((cardData): void => {
                showedCard.push(cardData);
            });
            newCards.forEach((cardData): void => {
                //TODO: revisar que ese valor no esté ya en el array
                showedCard.push(cardData);
            });
            this.setState({ reports: showedCard });
        }
    }


    /**
     * @returns {Function} Funcion
     * @example
     * //Example function
     * @description
     * // Esta función se encarga de controlar si quedan más reportes por mostrar, si no quedan,
     * no se puede seguir haciendo scroll.
     */
    public fetchMoreData(): void {
        if (this.state.reports.length >= this.cardBook.value.length) {
            this.setState({ hasMore: false });
        }
        else {
            this.cargaPags();
        }
    };

    public componentDidMount(): void {
        /**
         * Si la página a mostrar no tiene elementos, volverá a la función de la página para cargar datos 
         */
        if (this.state.reports.length === 0) {
            this.cargaPags();
        }
    }

    public render(): JSX.Element {

        /** Prepara las propiedades que tendrá el componente de scroll infinito. Se encarga de controlar cuantos elementos se van a mostrar
         * el tamaño que tendra el componente, cada cuanto tiene que mostrar elementos, que mensaje mostrar cuando esté todo cargado...
         */
        const config = {
            dataLength: this.state.reports.length,
            next: this.fetchMoreData,
            hasMore: this.state.hasMore,
            height: 900,
            loader: "",
            endMessage:
                <div className="divEndMessage">
                    <b className="endMessage">Todos los elementos cargados</b>
                </div>
        };

        /** Aquí se controla si hay reportes en el array, en caso de que si, crea la tarjeta, le asigna una ID y la maqueta. */
        let myReports: JSX.Element[] = [];


        if (this.state.reports.length > 0) {
            this.state.reports.forEach((cardData): void => {
                let myCardEle = <div key={'card_sample_'.concat(cardData.id)} id={'card_sample_' + cardData.id} className="controlTarjetas">
                    <CardRender key={'CardRender_'.concat(cardData.id)} data={cardData} />
                </div>;
                myReports.push(myCardEle);
            });
        }

        /** Prepara el contenedor donde irán alojadas los reportes, estas se mostrarán en 4 columnas. El infinity scroll hace referencia
         * al componente que nos permite que solo carge los elementos haciendo scroll sobre el elemento ROW, no sobre la página entera (window).
         */
        return (
            <div className='control-pane'>
                <div className="control-section card-control-section tile_layout">
                    <div className=' e-card-layout ' >
                        <InfiniteScroll {...config}>
                            <div className="row rowStyle">
                                <div id="target">
                                    {myReports}
                                </div>
                            </div>
                            <br />
                            <div ><button id="boton" hidden={!this.state.hasMore} onClick={this.cargaPags.bind(this, "")} className="newCard" >Cargar reportes</button></div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Tile);

