import { Button, Col, Form, Input, Radio, Row } from "antd";
import "./index.scss";
import { CaretLeftFilled } from "@ant-design/icons";
import Container from "../../../components/container/Container";
function Cart() {
  //vùng js
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
                <Form.Item>
                  <Input className="input" placeholder="Name..." />
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={14}>
            <div className="cart_button">
              <Button type="primary" className="cart_button_comback">
                <CaretLeftFilled className="cart_button_comback_icon" /> Tiếp
                tục mua sắm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Cart;
