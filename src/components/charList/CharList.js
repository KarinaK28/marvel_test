import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
//import abyss from '../../resources/img/abyss.jpg';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,//обычный которыйй запускается при первичной загрузке первый 9 персонажей
        error: false,
        newItemLoading: false,//относится к загрузке новых элементов,после вызова onRequest 
        offset: 1548,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
 //       this.foo.bar = 0;
        // this.marvelService.getAllCharacters()
        //     .then(this.onCharListLoaded)
        //     .catch(this.onError)
        //меняем все это на onRequest, когда наш компонент будет создан,
// те вызван хук   componentDidMount(), вызывается метод onRequest(),
// без аргумента, те offset- будет null, обращаемся к серверу
// this.marvelService.getAllCharacters()-так же аргумент никакой 
//не передается, те в сервисе будет подставлен базовый отступ 
//(offset = this._baseOffset)(в компоненте MarvelService - 210),
//это впервыц раз когда компонент был создан, но потом, когда 
// вызыввем вручную метод onRequest по клику на кнопки , то уже будет подставляться 
//число ,которое будет формировать другой запрос
    }
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {//запустился процесс и чтото грузится
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {//загрузились новые данные
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none': 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}




export default CharList;