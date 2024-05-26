import { useState } from 'react';
import { Row, Col, Image, Breadcrumb, Layout, theme, Select, Space, ConfigProvider, Button } from 'antd';
import Container from '../../../components/container/Container';
import { Collapse } from 'antd';
import './index.scss';
import { TinyColor } from '@ctrl/tinycolor';
import { CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CardIndex from '../../../components/Card';

const colors1 = ['#6253E1', '#04BEFE'];
const colors3 = ['#000000', '#013A40'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const { Content } = Layout;
const { Option } = Select;


const ProductDetails = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [mainImage, setMainImage] = useState('https://jemmia.vn/wp-content/uploads/2024/03/1_cam_03-copy-1-1.jpg');
  const [setSelectedSize] = useState(null);
  const thumbnails = [
    'https://jemmia.vn/wp-content/uploads/2024/03/1_cam_03-copy-1-1.jpg',
    'https://jemmia.vn/wp-content/uploads/2024/03/1_cam_02-copy-1-1.jpg',
    'https://jemmia.vn/wp-content/uploads/2024/03/1_cam_01-copy-1-1.jpg',
    'https://jemmia.vn/wp-content/uploads/2024/03/4_cam_01-copy-1-1.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMainImageClick = () => {
    const nextIndex = (currentImageIndex + 1) % thumbnails.length;
    setCurrentImageIndex(nextIndex);
    setMainImage(thumbnails[nextIndex]);
  };
  const handleThumbnailClick = (index) => {
    if (index >= 0 && index < thumbnails.length) {
      setMainImage(thumbnails[index]);
    }
  };
  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

    const [count, setCount] = useState(1);
  
    const increment = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const decrement = () => {
      if (count > 1) {
        setCount(prevCount => prevCount - 1);
      }
    };
  const text1 = `  Trang Sức Kim Cương Tại Diamond
   - Trang Sức Đa Dạng Mẫu Mã, Thiết Kế Theo Cá Nhân Hoá.
   - Trang Thiết Bị Công Nghệ Kiểm Định Hiện Đại Nhất.
   - Trải Nghiệm Dịch Vụ Kim Cương Đẳng Cấp.
  Kim Cương Viên Tại Diamond
   - Có giấy Kiểm Định GIA
   - Có xuất Hoá Đơn VAT
   - Nhập Khẩu Hải Quan Chính Ngạch
  `;
  const text2 = ` - Nếu nhận hàng mà sản phẩm không đạt chất lượng thì sao?
Quý khách hàng vui lòng liên hệ với tư vấn viên trong vòng 24 GIỜ kể từ khi nhận sản phẩm, Diamond sẽ hỗ trợ đổi hàng hoàn toàn miễn phí trong trường hợp sản phẩm bị lỗi do sản xuất.
  
   - Mua hàng online làm sao biết kích thước nhẫn nào vừa tay?
Diamond sẽ gửi tặng bộ đo ni tay đến tận nơi của Quý khách hoàn toàn miễn phí. Bạn chỉ cần chọn ni nhẫn phù hợp và thông báo với tư vấn viên của chúng tôi. Ngoài ra, Diamond hỗ trợ điều chỉnh size nhẫn miễn phí trọn đời trong trường hợp bạn muốn thay đổi.
  
   - Có gì để chứng minh tôi đã mua sản phẩm của Diamond không?
Sản phẩm Diamond được đảm bảo tính pháp lý qua 03 loại chứng từ sau: hóa đơn bán hàng, hợp đồng mua bán và hóa đơn VAT đảm bảo mọi quyền lợi của khách hàng.
  
   - Diamond có thiết kế sản phẩm theo yêu cầu không?
Diamond rất hân hạnh được cùng bạn tạo nên những thiết kế trang sức độc bản. Chúng tôi sẵn sàng lắng nghe ý tưởng, phác thảo, hoàn thiện và gia công theo yêu cầu riêng của bạn.
  `;
  const items = [
    "Tất cả trang sức hoàn toàn chuẩn xác về hàm lượng và trọng lượng vàng, được kiểm định chặt chẽ bằng máy quang phổ.",
    "100% Trang sức kim cương đều có chứng nhận đạt tiêu chuẩn GIA.",
    "Toàn bộ sản phẩm trang sức tại Jemmia có đầy đủ hóa đơn, chứng từ chứng minh nguồn gốc xuất xứ và đầy đủ thông tin về hàm lượng, trọng lượng vàng.",
    "Toàn bộ sản phẩm trang sức tại Jemmia có đầy đủ hóa đơn, chứng từ chứng minh nguồn gốc xuất xứ và đầy đủ thông tin về hàm lượng, trọng lượng vàng."
  ];
  
  return (
    <div>
      <Container>
        <div className="tabner">
          <Content style={{ padding: '0 0px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/nhan-cau-hon">Nhẫn cầu hôn</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Nhẫn kim cương 18k</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 0,
                padding: 0,
                borderRadius: borderRadiusLG,
              }}
            />
          </Content>
          <div className="product-details">
            <Row justify="center" gutter={[16, 16]}> 
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="image">
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                  }}
                >
                <Image
                  width={400}
                  src={mainImage}
                  onClick={handleMainImageClick}
                />
                  <div className="image-add">
                    <Row gutter={0}>
                    {thumbnails.map((thumb, index) => (
                      <Col key={index} span={6}>
                        <Image
                          width={100}
                          src={thumb}
                          onClick={() => handleThumbnailClick(index)}
                          className="thumbnail"
                        />
                      </Col>
                    ))}
                    </Row>
                  </div>
                  </Image.PreviewGroup>
                </div>
                
              </Col>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
                <div className="description-product">
                  <h1>Nhẫn kim cương 18k</h1>
                  <h3>MS012345</h3>
                  <h2 style={{ color: 'red' }}>123,123,123đ</h2>
                  <h4><a href='/'>Chính sách hoàn trả</a></h4>
                  <div className='size'>
                    <Space>
                    <h4>Size:</h4>
                      <Select
                        placeholder="Size"
                        style={{ width: 70 }}
                        onChange={handleSizeChange}
                      >
                        <Option value="size1">10</Option>
                        <Option value="size2">11</Option>
                        <Option value="size3">12</Option>
                        <Option value="size4">13</Option>
                      </Select>
                    </Space>
                  </div>
                  <div className='huong-dan'>
                  <h5><a href='/'>Hướng dẫn chọn size (Đo ni)</a></h5>
                  </div>
                  <div className='quantity'>
                    <h4>Số lượng: </h4>
                    <button onClick={decrement} disabled={count === 1} className="button">-</button>
                    <input className='count' type="text" value={count} readOnly style={{width: '30px', textAlign: 'center'}} />
                    <button onClick={increment} className="button">+</button>
                  </div>
                  <div className='add'>
                  <Space>
                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            colorPrimary: `linear-gradient(116deg,  ${colors3.join(', ')})`,
                            colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(', ')})`,
                            colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(', ')})`,
                            lineWidth: 0,
                          },
                        },
                      }}
                    >
                      <Button type="primary" size="large">
                        Thêm vào giỏ hàng
                      </Button>
                  </ConfigProvider>
                  <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                          colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
                          colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
                          lineWidth: 0,
                        },
                      },
                    }}
                  >
                    <Button type="primary" size="large">
                      Liên hệ tư vấn
                    </Button>
                  </ConfigProvider>
                  </Space>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="details">
            <Row justify="center" gutter={[16, 16]}>
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
              <div className='intro'>
              <Collapse
                  size="small"
                  style={{ width: 500 }}
                  items={[
                    { 
                      key: '1', 
                      label: <strong>Chi tiết sản phẩm và mô tả</strong>,
                      children: 
                      <pre style={{ whiteSpace: 'pre-wrap', margin: '0',fontSize: '16px', fontFamily: 'Arial' }}>
                        <div className="card-body">
                          <table className="table table-bordered" style={{ width: '100%', height: '313px', borderCollapse: 'collapse' }}>
                            <tbody style={{ fontStyle: 'initial' }}>
                              <tr style={{ height: '33px', border: '1px solid #000' }}>
                                <td style={{ height: '33px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Thương hiệu</span></td>
                                <td className="last td-content" style={{ height: '33px', width: '38.4%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}><Link to="/" style={{color: 'black', textDecoration: 'none'}}>Diamond</Link><br /></span></td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Loại sản phẩm</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>Nhẫn cầu hôn</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Kích thước đá chủ</span></td>
                                <td style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Round 4ly</span></td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Loại đá tẩm</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>Kim cương</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Số lượng đá tẩm</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>38</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Trọng lượng đá (ct)</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>0.375</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Loại vàng</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>Vàng trắng</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Tuổi vàng</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>18K</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Trọng lượng vàng</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}>0.85 chỉ</span></div>
                                </td>
                              </tr>
                              <tr style={{ height: '28px', border: '1px solid #000' }}>
                                <td style={{ height: '28px', width: '61.44%', border: '1px solid #000' }}><span style={{ fontSize: '14px', marginLeft: '5px' }}>Chất liệu khác</span></td>
                                <td className="last td-content" style={{ height: '28px', width: '38.4%', border: '1px solid #000' }}>
                                  <div><span style={{ fontSize: '14px', marginLeft: '5px' }}> </span></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </pre> 
                    }
                  ]}
                />
                <Collapse
                  size="small"
                  style={{ width: 500 }}
                  items={[
                    { 
                      key: '1', 
                      label: <strong>Vì sao chọn Diamond</strong>,
                      children: <pre style={{ whiteSpace: 'pre-wrap' }}>{text1}</pre> 
                    }
                  ]}
                />
                <Collapse
                  size="small"
                  style={{ width: 500 }}
                  items={[
                    { 
                      key: '1', 
                      label: <strong>Bình luận và đánh giá</strong>,
                      children: <pre style={{ whiteSpace: 'pre-wrap' }}>{text2}</pre> 
                    }
                  ]}
                />
                <Collapse
                  size="small"
                  style={{ width: 500 }}
                  items={[
                    { 
                      key: '1', 
                      label: <strong>Một số câu hỏi thường gặp</strong>,
                      children: <pre style={{ whiteSpace: 'pre-wrap' }}>{text1}</pre> 
                    }
                  ]}
                />
                </div>
              </Col>
              
              <Col span={12} xs={24} sm={24} md={24} lg={12}>
              <div className="elementor-column">
                <div className="elementor-widget-wrap">
                  <div className="elementor-element elementor-icon-list">
                    <div className="elementor-widget-container">
                      <ul className="elementor-icon-list-items">
                        <li className="elementor-icon-list-item">
                          <span className="elementor-icon-list-icon">
                            <i aria-hidden="true" className="far fa-handshake"></i>
                          </span>
                          <span className="elementor-icon-list-text"><SafetyCertificateOutlined style={{color: 'red'}}/> CAM KẾT CHẤT LƯỢNG</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="elementor-element elementor-text-editor">
                    <div className="elementor-widget-container">
                      {items.map((item, index) => (
                        <div className="row" key={index}>
                          <div className="column1">
                            <i className="far fa-check-circle" style={{ color: 'red' }} aria-hidden="true"></i>
                          </div>
                          <div className="column">
                            <span style={{ fontSize: '14px' }}><CheckCircleOutlined style={{color: 'red'}}/> {item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </Col>
            </Row>
          </div>
          <div className="product-relate-container">
            <h2>Các sản phẩm liên quan</h2>
              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                {[1, 2, 3, 4].map((_, index) => (
                  <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} key={index}>
                    <Link to="/product-details">
                      <div>
                        <CardIndex />
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
