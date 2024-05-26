import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import "./index.scss";
import { CaretLeftFilled } from "@ant-design/icons";
import Container from "../../../components/container/Container";


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
    const renderProductItem = (name, code, price) => (
      <div className="cart_product_frame">
        <Row className="cart_product_item">
          <Col span={10}>
            <img src="https://via.placeholder.com/220x362" alt="Product" className="cart_product_image" />
          </Col>
          <Col span={10} className="cart_product_details">
            <div>
              <p className="cart_product_name">{name}</p>
              <p className="cart_product_code">Mã: {code}</p>
            </div>
            <div className="cart_product_select_container">
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
                  <Select placeholder="1">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="price">
                <span className="price_label">Giá:</span>
                <span className="price_value">{price}₫</span>
              </div>
            </div>
            </Col>
      <Col span={4} className="cart_product_delete">
        <Button type="default" className="delete_product_button">
          <CaretLeftFilled className="cart_button_delete_icon" /> Xóa
        </Button>
      </Col>
        </Row>
      </div>
    );
    
    


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



              <Form style={{ padding: "25px 30px" }}>
                
              <Form.Item>
                  <Radio.Group>
                    <Radio value="apple"> Nam </Radio>
                    <Radio value="pear"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item name="name" rules={[{ required: true, message: 'Xin hãy nhập vào Name!' }]}>
                  <Input className="input" placeholder="Name*" style={{ width: '476px', height: '47px' }} />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true, message: 'Xin hãy nhập vào SĐT!' }]}>
                  <Input className="input" placeholder="SĐT*"style={{ width: '476px', height: '47px' }}  />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, message: 'Xin hãy nhập vào Email!' }]}>
                  <Input className="input" placeholder="Email*"style={{ width: '476px', height: '47px' }}  />
                </Form.Item>

                <Form.Item name="birthdate" rules={[{ required: true, message: 'Xin hãy nhập vào Ngày sinh!' }]}>
                  <Input className="input" placeholder="Ngày sinh*"style={{ width: '476px', height: '47px' }}  />
                </Form.Item>

              </Form>
              
             
             

              <div className="cart_form_title">
                <Button shape="circle">
                    <p>2</p>
                </Button>
                    <h2>Địa chỉ</h2>
              </div>


              <Form form={form} onFinish={onFinish} style={{ padding: "25px 30px" }}>



                <Form.Item name="city">
                  <Select className="input" placeholder="Tỉnh/TP*"style={{ width: '476px', height: '47px' }} >
                    <Option value="hanoi">Hà Nội</Option>
                    <Option value="tphcm">TP.HCM</Option>
                    <Option value="vungtau">TP.Vũng Tàu</Option>
                    <Option value="baoloc">TP.Bảo Lộc</Option>
                   
                  </Select>
                </Form.Item>
                
                
                <Form.Item name="district"> 
                  <Select className="input" placeholder="Quận/Huyện*"style={{ width: '476px', height: '47px' }} >
                    <Option value="namtulien">Nam Từ Liêm</Option>
                    <Option value="quan1">Quận 1</Option>
                    <Option value="vung">Huyện.Vũng Tàu</Option>
                    <Option value="baolam">Huyện Bảo Lâm</Option>
                   
                  </Select>
                </Form.Item>

                <Form.Item name="ward">
                  <Select className="input" placeholder="Phường/Xã*"style={{ width: '476px', height: '47px' }} >
                    <Option value="xhn">P/X ở HN</Option>
                    <Option value="xhcm">Xã hcm</Option>
                    <Option value="xvt">xã ở Vũng Tàu</Option>
                    <Option value="xbl">p/x ở cl</Option>


                 
                  </Select>
                </Form.Item>


                <Form.Item name="address" rules={[{ required: true, message: 'Xin hãy nhập vào Địa chỉ cụ thể!' }]}>
                  <Input className="input" placeholder="Địa chỉ cụ thể*" style={{ width: '476px', height: '47px' }} />
                </Form.Item>


                <Form.Item name="note" rules={[{ required: true, message: 'Xin hãy nhập vào Ghi chú!' }]}>
                  <Input className="input" placeholder="Ghi chú*" style={{ width: '476px', height: '47px' }} />
                </Form.Item>
              </Form>


            </div>
            <div className="cart_form_title">
                <Button shape="circle">
                    <p>3</p>
                </Button>
                    <h2>Nhập Điểm</h2>
              </div>


              <Form form={form} onFinish={onFinish} style={{ padding: "25px 30px", maxWidth: '476px' }}>
  <Form.Item name="points" rules={[{ required: true, message: 'Xin hãy nhập điểm!' }]} style={{ marginBottom: '20px' }}>
    <Input className="input" placeholder="Nhập điểm *" style={{ width: '476px', height: '47px' }}/>
  </Form.Item>

  <Form.Item name="agreement">
    <Radio.Group>
      <Radio value="agree_promotions">
        Đồng ý nhận các thông tin và chương trình khuyến mãi của PNJ qua email, SMS, mạng xã hội…
      </Radio>
      <Radio value="agree_processing">
        Tôi đồng ý cho PNJ thu thập, xử lý dữ liệu cá nhân của tôi theo quy định tại Thông báo này và theo quy định của pháp luật.
      </Radio>
      <Radio value="disagree">Tôi không đồng ý</Radio>
    </Radio.Group>
    </Form.Item>
    
    <Button className="confirm_button"style={{ width: '310px', height: '48px' }}>Xác nhận</Button>
  
</Form>

          </Col>



         
<Col span={14}>
            <Form style={{ padding: "30px" }} className="cart_form_content">
              <div className="cart_form_title_h2">
                <h2 style={{ fontSize: '40px', margin: '10px 0' }}>Thông tin giỏ hàng</h2>
              </div>
              <div className="cart_product_info">
                {renderProductItem('NHẪN KIM CƯƠNG NỮ 18K', 'NKC12345', '510.000.000')}
                {renderProductItem('VÒNG TAY KIM CƯƠNG NỮ 18K', 'VTKC12345', '500.000.000')}
              </div>
            </Form>
            <div className="cart_summary">
              <div className="cart_summary_item">
                <span className="cart_summary_label_light">Tạm tính:</span>
                <span className="cart_summary_value">1.010.000.000₫</span>
              </div>
              <div className="cart_summary_item">
                <span className="cart_summary_label_light">Chi phí vận chuyển:</span>
                <span className="cart_summary_value_bold">Miễn phí</span>
              </div>
            </div>
            <div className="cart_total">
  <div className="total_price">
    <span className="total_price_label">Thành tiền:</span>
    <span className="total_price_value">1.100.000.000₫</span>
  </div>
  <div className="vat_statement">Giá tham khảo đã bao gồm VAT</div>
</div>


          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Cart;
