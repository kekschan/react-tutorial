import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import axios from "axios";
import MyToast from "./MyToast";

export default class Book extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);

    };

    initialState = {
        title: '', coverPhotoURL: '', author: '',
        isbnNumber: '', price: '', language: ''
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            coverPhotoURL: this.state.coverPhotoURL
        };

        axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState);
    };

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    bookList = () =>{
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, isbnNumber, price, language, coverPhotoURL} = this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={"Книжка добавлена в библиотеку."}
                             type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header> <FontAwesomeIcon icon={faPlusSquare}/> Добавить книгу</Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitBook} id={"bookFormId"}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"title"}
                                                  value={title} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите название книги"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridAuthor"}>
                                    <Form.Label>Автор</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"author"}
                                                  value={author} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите автора"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridIsbm"}>
                                    <Form.Label>ISBN номер</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"isbnNumber"}
                                                  value={isbnNumber} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите ISBN номер"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPrice"}>
                                    <Form.Label>Цена</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"price"}
                                                  value={price} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите цену"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridLanguage"}>
                                    <Form.Label>Язык</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"language"}
                                                  value={language} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите язык"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formCoverPhotoURL"}>
                                    <Form.Label>URL </Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"coverPhotoURL"}
                                                  value={coverPhotoURL} onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Введите адрес картинки"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size={"sm"} variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Добавить
                            </Button>{' '}
                            <Button size={"sm"} variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Обновить
                            </Button>{' '}
                            <Button size={"sm"} variant="info" type="button" onClick={this.bookList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Список книг
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        )
    }
};
