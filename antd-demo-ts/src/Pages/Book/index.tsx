import React, { useState, useEffect } from 'react';
import {  Col, Row, Layout, Menu, Typography } from 'antd';
import { RouteComponentProps, Link } from "react-router-dom";

import 'antd/dist/antd.css';
import api from '../../services/api';

type Props = {
    id: string;
}

const Book = ({ match }: RouteComponentProps<Props>) => {
    const [books, setBooks] = useState([]);

    const { Header, Content, Footer } = Layout;
    const { Title } = Typography;

    useEffect(() => {
        api.get('/').then(response => {
            setBooks(response.data);
        })
    }, []);


    return (
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">
                    <Link to="/">
                        BookMaster
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">Livro</Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
                {books.map((book: any) => {
                    if(book.id == match.params.id) {
                        return <div>
                            <Title level={2}>{book.name}</Title>
                            <Row gutter={[32, 48]}>
                                <Col className="gutter-row" xs={20} sm={16} md={12} lg={10} xl={8}>
                                    <img height="400" width="250" alt={book.name} src={book.image}></img>
                                </Col>
                                <Col className="gutter-row" xs={20} sm={16} md={12} lg={10} xl={8}>
                                    <p><b>Autor: </b>{book.author}</p>
                                    <p className="text-justify"><b>Descrição: </b>{book.description}</p>
                                </Col>
                            </Row>
                        </div>    
                    }
                })}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Book;