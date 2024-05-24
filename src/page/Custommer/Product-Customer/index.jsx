import React, { useState } from 'react';
import "./index.scss";
import { Select, Space, Pagination } from 'antd';
import { Col, Divider, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Carousel from '../../../components/carousel';
import CardEx from './CardEx';
import { Button, Form, Input, InputNumber } from 'antd';

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

function HomeProduct() {
    const [value, setValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Nhẫn Cầu Hôn');

    const handleChange = (value, option) => {
        setValue(value);
        setSelectedCategory(option.label);
        console.log(value);
    };

    const renderCards = () => {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            const cols = [];
            for (let j = 0; j < 4; j++) {
                cols.push(
                    <Col key={`col-${i}-${j}`} span={4}>
                        <CardEx />
                    </Col>
                );
            }
            rows.push(
                <div className='product-detail' key={`row-${i}`}>
                    <Divider orientation="left"></Divider>
                    <Row justify="space-around">
                        {cols}
                    </Row>
                </div>
            );
        }
        return rows;
    };

    return (
        <div>
            <Header />
            <Carousel />
            <div className="category-product">
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
                                        { value: 'category1', label: 'Category 1' },
                                        { value: 'category2', label: 'Category 2' },
                                        { value: 'category3', label: 'Category 3' },
                                        { value: 'category4', label: 'Category 4', disabled: true },
                                    ]}
                                />
                                <Select
                                    defaultValue="Mức giá"
                                    style={{ width: 100 }}
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
                    {renderCards()}
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
                                maxWidth: 600,
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
                                <Input placeholder="Họ và tên" />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'email']}
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name={['user', 'phone']}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                            <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 8,
                            }}
                            >
                            <Button type="primary" htmlType="submit">
                                Tư vấn ngay
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeProduct;
