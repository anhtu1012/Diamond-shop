import { useState } from 'react';
import "./index.scss";
import { Select, Space, Pagination, Breadcrumb, theme } from 'antd';
import { Col, Row } from 'antd';
import Carousel from '../../../components/carousel';
import { Button, Form, Input } from 'antd';
import Container from '../../../components/container/Container';
import CardIndex from '../../../components/Card';
import Foster from '../../../components/Foster';
import { Content } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const onFinish = (values) => {
    console.log(values);
  };


function NhanCauHon() {
    const [/*value*/, setValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Nhẫn Cầu Hôn');

    const handleChange = (value, option) => {
        setValue(value);
        setSelectedCategory(option.label);
        console.log(value);
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    // const renderCards = () => {
    //     const rows = [];
    //     for (let i = 0; i < 4; i++) {
    //         const cols = [];
    //         for (let j = 0; j < 4; j++) {
    //             cols.push(
    //                 <Col key={`col-${i}-${j}`} span={4}>
    //                     <CardEx />
    //                 </Col>
    //             );
    //         }
    //         rows.push(
    //             <div className='product-detail' key={`row-${i}`}>
    //                 <Divider orientation="left"></Divider>
    //                 <Row justify="space-around">
    //                     {cols}
    //                 </Row>
    //             </div>
    //         );
    //     }
    //     return rows;
    // };

    return (
        <div>           
            <Carousel />
            <Container>
            
            <div className="category-product">
                <Content style={{ padding: '0 0px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><a href="/">Trang chủ</a></Breadcrumb.Item>
                <Breadcrumb.Item>Nhẫn cầu hôn</Breadcrumb.Item>
                </Breadcrumb>
                <div
                style={{
                    background: colorBgContainer,
                    minHeight: 0,
                    padding: 0,
                    borderRadius: borderRadiusLG,
                }}
                >
                </div>
                </Content>
                <h1>{selectedCategory}</h1>
                <div className="choose-product">
                    <Row>
                        <Col span={8}>
                            <Space wrap>
                                <h3>Bộ lọc:</h3>
                                <Select
                                    defaultValue="Danh mục sản phẩm"
                                    style={{ width: 170 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'category1', label: 'Nhẫn Cầu Hôn' },
                                        { value: 'category2', label: 'Nhẫn Cầu Hôn' },
                                        { value: 'category4', label: 'Nhẫn Cầu Hôn', disabled: true },
                                    ]}
                                />
                                <Select
                                    defaultValue="Mức giá"
                                    style={{ width: 100 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'price1', label: 'Price 1' },
                                        { value: 'price2', label: 'Price 2' },
                                        { value: 'price4', label: 'Price 4', disabled: true },
                                    ]}
                                />
                            </Space>
                        </Col>
                        <Col span={8} offset={8}>
                            <Space>
                                <h3>Sắp xếp:</h3>
                                <Select
                                    defaultValue="Mức giá"
                                    style={{ width: 170 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'price1', label: 'Price 1' },
                                        { value: 'price2', label: 'Price 2' },
                                        { value: 'price3', label: 'Price 3' },
                                        { value: 'price4', label: 'Price 4', disabled: true },
                                    ]}
                                />
                            </Space>
                        </Col>
                    </Row>
                    {/* {renderCards()} */}
                    
                </div>
                <div className='product'>
                    <Row
                            gutter={{
                                xs: 8,
                                sm: 16,
                                md: 24,
                                lg: 32,
                            }}
                            >
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={6}>
                        <Link to="/product-details">
                            <div>
                                <CardIndex />
                            </div>
                        </Link>
                        </Col>
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={6}>
                        <Link to="/product-details">
                            <div>
                                <CardIndex />
                            </div>
                        </Link>
                        </Col>
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={6}>
                        <Link to="/product-details">
                            <div>
                                <CardIndex />
                            </div>
                        </Link>
                        </Col>
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={6}>
                        <Link to="/product-details">
                            <div>
                                <CardIndex />
                            </div>
                        </Link>
                        </Col>
                        <Col className="gutter-row" xs={12} sm={12} md={12} lg={6}>
                        <Link to="/product-details">
                            <div>
                                <CardIndex />
                            </div>
                        </Link>
                        </Col>
                        
                    </Row>     
                    </div>                       
                <div className='choose-page'>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
                <div className='form'>
                    <h2>Nhập thông tin để được tư vấn miễn phí</h2>
                    <div className='form-dien'>
                        <Form
                            {...layout}
                            name="nest-messages"
                            onFinish={onFinish}
                             style={{
                                 maxWidth: 500,
                             }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name={['user', 'name']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Họ và tên" style={{width: 500}} />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'email']}
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" style={{width: 500}}/>
                            </Form.Item>
                            <Form.Item
                                name={['user', 'phone']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Số điện thoại" style={{width: 500}} />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 8,
                                }}
                            >
                                <div className='button'>
                                <Button type="primary" htmlType="submit">
                                    Tư vấn ngay
                                </Button>
                            </div>
                            </Form.Item>
                            
                        </Form>
                    </div>
                </div>

                <div>
                    <Foster/>
                </div>
            </div>
            </Container>
        </div>
    );
}

export default NhanCauHon;
