import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import "./index.scss";
import { CaretLeftFilled } from "@ant-design/icons";
import Container from "../../../components/container/Container";
import React from 'react';

const { Option } = Select;




function Cart() {
  //vùng js

  const [form] = Form.useForm();

  const onFinish = (values)=> {
      console.log('Received values: ', values);
  // check form khi nhập sai
};
const sizeOptions = [];
    for (let i = 6; i <= 20; i++) {
        sizeOptions.push(<Option key={i} value={i}>{i}</Option>);
    }

  return (
    <Container>
      <div>
        <div className="cart_button">

          <Button type="primary" className="cart_button_comback">
            <CaretLeftFilled className="cart_button_comback_icon" /> Tiếp tục
            mua sắm
          </Button>

        

        </div>
        <Row className="cart-main">
          <Col span={10} className="cart_main_col">

            <div className="cart_form">
              <div className="cart_form_title">
                <Button shape="circle">
                  <p>1</p>
                </Button>
                <h2>Thông tin người mua</h2>
              </div>



              <Form style={{ padding: "30px 30px" }}>
              <Form.Item>
                  <Radio.Group>
                    <Radio value="apple"> Nam </Radio>
                    <Radio value="pear"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item name="name" rules={[{ required: true, message: 'Xin hãy nhập vào Name!' }]}>
                  <Input className="input" placeholder="Name*" />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true, message: 'Xin hãy nhập vào SĐT!' }]}>
                  <Input className="input" placeholder="SĐT*" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, message: 'Xin hãy nhập vào Email!' }]}>
                  <Input className="input" placeholder="Email*" />
                </Form.Item>

                <Form.Item name="birthdate" rules={[{ required: true, message: 'Xin hãy nhập vào Ngày sinh!' }]}>
                  <Input className="input" placeholder="Ngày sinh*" />
                </Form.Item>

              </Form>
              
             
             

              <div className="cart_form_title">
                <Button shape="circle">
                    <p>2</p>
                </Button>
                    <h2>Địa chỉ</h2>
              </div>


              <Form form={form} onFinish={onFinish} style={{ padding: "30px 30px" }}>



                <Form.Item name="city">
                  <Select className="input" placeholder="Tỉnh/TP*">
                    <Option value="hanoi">Hà Nội</Option>
                    <Option value="tphcm">TP.HCM</Option>
                    <Option value="vungtau">TP.Vũng Tàu</Option>
                    <Option value="baoloc">TP.Bảo Lộc</Option>
                    //thêm
                  </Select>
                </Form.Item>
                
                
                <Form.Item name="district"> 
                  <Select className="input" placeholder="Quận/Huyện*">
                    <Option value="namtulien">Nam Từ Liêm</Option>
                    <Option value="quan1">Quận 1</Option>
                    <Option value="vung">Huyện.Vũng Tàu</Option>
                    <Option value="baolam">Huyện Bảo Lâm</Option>
                    //thêm
                  </Select>
                </Form.Item>

                <Form.Item name="ward">
                  <Select className="input" placeholder="Phường/Xã*">
                    <Option value="xhn">P/X ở HN</Option>
                    <Option value="xhcm">Xã hcm</Option>
                    <Option value="xvt">xã ở Vũng Tàu</Option>
                    <Option value="xbl">p/x ở cl</Option>


                  //thêm
                  </Select>
                </Form.Item>


                <Form.Item name="address" rules={[{ required: true, message: 'Xin hãy nhập vào Địa chỉ cụ thể!' }]}>
                  <Input className="input" placeholder="Địa chỉ cụ thể*" />
                </Form.Item>


                <Form.Item name="note" rules={[{ required: true, message: 'Xin hãy nhập vào Ghi chú!' }]}>
                  <Input className="input" placeholder="Ghi chú*" />
                </Form.Item>
              </Form>


            </div>
            <div className="cart_form_title">
                <Button shape="circle">
                    <p>3</p>
                </Button>
                    <h2>Nhập Điểm</h2>
              </div>


              <Form form={form} onFinish={onFinish} style={{ padding: "30px 30px" }}>
                <Form.Item name="points" rules={[{ required: true, message: 'Xin hãy nhập điểm!' }]}>
                  <Input className="input" placeholder="Nhập điểm *" />
                </Form.Item>

                <Form.Item name="agreement">
                  <Radio.Group>
                    <Radio value="agree_promotions">
                      Đồng ý nhận các thông tin và chương trình khuyến mãi của PNJ qua email, SMS , mạng xã hội…
                    </Radio>
                    <Radio value="agree_promotions">
                      Tôi đồng ý cho PNJ thu thập, xử lý dữ liệu cá nhân của tôi theo quy định tại Thông báo này và theo quy định của pháp luật.
                    </Radio>
                    <Radio value="disagree">Tôi không đồng ý</Radio>
                  </Radio.Group>
                </Form.Item>

              </Form>
                <Button className="confirm_button">Xác nhận</Button>     
          </Col>



          <Col span={14}>
          <Form style={{ padding: "30px 30px" }}>
          <div className="cart_form_title">              
                    <h2>Thông tin giỏ hàng</h2>
              </div>

              <div className="cart_product_info">
              <Row className="cart_product_item">
                <Col span={10}>
                  <img src="https://via.placeholder.com/250x300" alt="Product" className="cart_product_image" />
                  </Col>
                <Col span={10} className="cart_product_details">
                  <p className="cart_product_name"> NHẪN KIM CƯƠNG NỮ 18K</p>

                  <p className="cart_product_code">Mã: NKC12345</p>

                  <div className="cart_product_select">
                    <span className="cart_product_label">Size:</span>
                    <Form.Item name="size1" className="cart_product_size">
                        <Select placeholder="Size">
                            {sizeOptions}
                        </Select>
                    </Form.Item>
                  </div>

                  <div className="cart_product_select">
                    <span className="cart_product_label">Số lượng:</span>
                    <Form.Item name="quantity" className="cart_product_quantity">
                      <Select placeholder="Số lượng">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>

                      <div className="cart_product_price">500.000.000₫
                      
                      </div>

                     
        <div className="delete_product_button">
          <Button type="default" className="delete_product_button">
            <CaretLeftFilled className="cart_button_delete_icon" /> Xóa
          </Button>
        </div>
                      
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row className="cart_product_item">
                <Col span={10}>
                  <img src="https://via.placeholder.com/250x300" alt="Product" className="cart_product_image" />
                </Col>
                <Col span={10} className="cart_product_details">
                  <p className="cart_product_name">VÒNG TAY KIM CƯƠNG NỮ 18K</p>

                  <p className="cart_product_code">Mã: VTKC12345</p>

                  <div className="cart_product_select">
                    <span className="cart_product_label">Size:</span>
                    <Form.Item name="size" className="cart_product_size">
                        <Select placeholder="Size">
                            {sizeOptions}
                        </Select>
                    </Form.Item>

                  </div>
                  <div className="cart_product_select">
                    <span className="cart_product_label">Số lượng:</span>
                    <Form.Item name="quantity" className="cart_product_quantity">
                      <Select placeholder="Số lượng">
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                      </Select>

                      <div className="cart_product_price">500.000.000₫
                      
                      </div>


                      <div className="delete_product_button">

              <Button type="default" className="delete_product_button">
                  <CaretLeftFilled className="cart_button_delete_icon" /> Xóa
              </Button>

              <div className="cart_tamtinh">Tạm tính: 1.000.000.000 đ</div>
                  <div className="cart_vanchuyen">Chi phí vận chuyển: Miễn phí</div>
                  <div className="cart_total_price">Thành tiền: 1.000.000.000</div>
                  <div className="cart_vat">Giá tham khảo đã bao gồm VAT</div>

                  </div>
                    </Form.Item>
                  </div>
                  
                </Col>
              </Row>
              </div>
            </Form>
           


           
          
           

          </Col>
          
        </Row>
      

      </div>


    </Container>
  );
}

export default Cart;
