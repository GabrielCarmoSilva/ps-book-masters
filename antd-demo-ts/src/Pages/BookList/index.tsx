import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Layout, Menu, Typography, Button, Modal, Input } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';

import './styles.css';
import api from '../../services/api';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function BookList() {
    const [books, setBooks] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [toggleBook, setToggleBook] = useState();

    useEffect(() => {
        api.get('/').then(response => {
            setBooks(response.data);
        })
    }, []);

    function onClick(id) {
        setIsVisible(true);
        setModal(true);
        setToggleBook(id);
    }

    function handleCancel() {
        setModal(false);
        setIsVisible(false);
    }

    function showForm(id) {
        return (
            <Modal visible={modal} onCancel={handleCancel} footer={null}>
                <form onSubmit={handleLoanBook}>
                    <input type="hidden" name="id" value={id}></input>
                    <Row>
                        <Col span={12}>
                            <Input name="person_name" placeholder="Digite seu nome"></Input>
                        </Col>
                        <Col>
                            <Button className="margin" type="primary" htmlType="submit">Enviar</Button>
                        </Col>
                    </Row>
                </form>
            </Modal>        
        ); 
    }

    function handleLoanBook(e) {
        e.preventDefault();

        api.post(`/${e.target.id.value}`, {
            'person_name': e.target.person_name.value,
            'date': new Date().toLocaleString(),
        }).then((response) => {
            alert('Livro emprestado!');
            setBooks(response.data);
        })
        setIsVisible(false);
    }

    function giveBack(id) {
        api.post(`/give-back/${id}`)
            .then((response) => {
                alert('Livro devolvido!');
                setBooks(response.data);
            });
    }    

    return (
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">BookMaster</Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <Title level={2}>Lista de Livros</Title>
            <div className="site-layout-content">
                <div className="site-card-wrapper">
                    <Row gutter={[32, 16]}>
                    {books.map((book: any) => {
                        if(book.loaned == "true") {
                            return <Col className="gutter-row" xs={20} sm={16} md={12} lg={8} xl={4}> 
                                <Card
                                    hoverable 
                                    title={book.name}
                                    key={book.id}
                                    bordered={false}
                                    cover={<img width="100" height="200" alt="Capa do livro" src={book.image} />}>
                                    <Row gutter={[0, { xs: 32, sm: 24, md: 16, lg: 8 }]}>
                                        <Link to={`book/${book.id}`}>
                                            <Button type="primary">Ver mais</Button>
                                        </Link> 
                                    </Row>
                                    <br></br>
                                    <Row gutter={[0, 16]}>
                                        Emprestado<br></br>
                                        Nome: {book.person_name}<br></br>
                                        Data: {book.date}
                                        <Button onClick={() => giveBack(book.id)} type="primary">Devolver</Button>
                                    </Row>
                                </Card>
                            </Col>
                        } else {
                            return <Col className="gutter-row" xs={20} sm={16} md={12} lg={8} xl={4}>
                                <Card
                                    hoverable 
                                    title={book.name}
                                    key={book.id}
                                    bordered={false}
                                    cover={<img width="100" height="200" alt="Capa do livro" src={book.image} />}>
                                    <Row gutter={[0, 16]}>
                                        <Link to={`book/${book.id}`}>
                                            <Button type="primary">Ver mais</Button>
                                        </Link> 
                                    </Row>
                                    <br></br>
                                    <Row gutter={[0, 16]}>
                                        <Button onClick={() => onClick(book.id)} type="primary">Pegar emprestado</Button>
                                    </Row>
                                </Card>
                            </Col>
                        }    
                    })}
                        <Col>
                            {isVisible && showForm(toggleBook)} 
                        </Col>
                    </Row>
                </div>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );    
}

export default BookList;