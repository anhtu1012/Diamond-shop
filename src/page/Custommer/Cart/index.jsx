import { Button, Col, Form, Input, Radio, Row } from "antd";
import "./index.scss";
import { CaretLeftFilled, ItalicOutlined } from "@ant-design/icons";
import Wrap from "../../../Wrap";
function Cart() {
  //vùng js
  return (
    <Wrap>
      <div className="container-fluid">
        <div className="cart_button">
          <Button type="primary" className="cart_button_comback">
            <CaretLeftFilled className="cart_button_comback_icon" /> Tiếp tục
            mua sắm
          </Button>
        </div>
        <Row className="cart-main">
          <Col span={12} className="cart_main_col">
            <div className="cart_form">
              <div className="cart_form_title">
                <ItalicOutlined />
                <h2>Thông tin người mua</h2>
              </div>
              <Form style={{ padding: "30px 60px" }}>
                <Form.Item>
                  <Radio.Group>
                    <Radio value="apple"> Nam </Radio>
                    <Radio value="pear"> Nữ </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Input className="input" placeholder="Name..." />
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={12}>
            <div className="cart_button">
              <Button type="primary" className="cart_button_comback">
                <CaretLeftFilled className="cart_button_comback_icon" /> Tiếp
                tục mua sắm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Wrap>
  );
}

export default Cart;
