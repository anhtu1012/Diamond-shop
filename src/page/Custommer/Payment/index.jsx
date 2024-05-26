import { Button, Col, Form, Radio, Row, Select } from "antd";
import "./index.scss";
import { CaretLeftFilled, IdcardOutlined } from "@ant-design/icons";
import Container from "../../../components/container/Container";

const { Option } = Select;

function Payment() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values: ', values);
  };

  const sizeOptions = [];
  for (let i = 6; i <= 20; i++) {
    sizeOptions.push(<Option key={i} value={i}>{i}</Option>);
  }

  const renderProductItem = (name, code, price) => (
    <div className="cart_product_frame" key={code}>
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
              <Form.Item name={`size-${code}`} className="cart_product_size">
                <Select placeholder="Size">
                  {sizeOptions}
                </Select>
              </Form.Item>
            </div>
            <div className="cart_product_select">
              <span className="cart_product_label">Số lượng:</span>
              <Form.Item name={`quantity-${code}`} className="cart_product_quantity">
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
            <CaretLeftFilled className="cart_button_comback_icon" /> Tiếp tục mua sắm
          </Button>
        </div>
        <Row className="cart-main">
          <Col span={14}>
            <Form form={form} onFinish={onFinish} style={{ padding: "30px" }} className="cart_form_content">
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

          <Col span={10} className="cart_main_col">
            <Form form={form} onFinish={onFinish} style={{ padding: "30px" }}>
              <div className="cart_form_title">
                <Button shape="circle">
                  <p>1</p>
                </Button>
                <h2>Phương thức vận chuyển</h2>
              </div>
              <Form.Item name="chooseMethod">
                <Radio.Group>
                  <Radio value="home" style={{ width: '467px', height: '47px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 10px', marginBottom: '10px', borderRadius: '8px' }}>
                    Giao hàng tận nơi 
                    <IdcardOutlined style={{ marginLeft: 'auto' }} />
                  </Radio>
                  <Radio value="stores" style={{ width: '467px', height: '47px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 10px', borderRadius: '8px' }}>
                    Đến cửa hàng
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <div className="cart_form_title">
                <Button shape="circle">
                  <p>2</p>
                </Button>
                <h2>Phương thức thanh toán</h2>
              </div>
              <Form.Item name="paymentMethod">
                <Radio.Group>
                  <Radio value="transfer" style={{ width: '467px', height: '47px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 10px', marginBottom: '10px', borderRadius: '8px' }}>
                    Chuyển khoản qua ngân hàng
                  </Radio>
                  <Radio value="installment" style={{ width: '467px', height: '47px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 10px', marginBottom: '10px', borderRadius: '8px' }}>
                    Thanh toán trả góp qua thẻ tín dụng
                  </Radio>
                  <Radio value="online" style={{ width: '467px', height: '47px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 10px', borderRadius: '8px' }}>
                    Thanh toán online bằng thẻ ATM/Visa/Master...
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Button type="primary" htmlType="submit" className="payment_button" style={{ width: '310px', height: '48px' }}>
                Thanh toán
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Payment;
