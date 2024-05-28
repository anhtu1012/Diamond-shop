import "./index.scss";
import { FaHandshake, FaCheckCircle } from 'react-icons/fa';

const CommitmentQuality = () => {
  return (
    <div className="elementor-widget-wrap elementor-element-populated">
      <div className="elementor-element elementor-align-left elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list">
        <div className="elementor-widget-container">
          <ul className="elementor-icon-list-items">
            <li className="elementor-icon-list-item">
              <span className="elementor-icon-list-icon">
                <FaHandshake aria-hidden="true" className="far fa-handshake" style={{color: "red", width: "30px"}}/>
              </span>
              <span className="elementor-icon-list-text" style={{ fontSize: '20px', fontFamily: 'Arial', fontWeight: "bold"}}>CAM KẾT CHẤT LƯỢNG</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="elementor-element elementor-widget elementor-widget-text-editor">
        <div className="elementor-widget-container">
          {[
            'Tất cả trang sức hoàn toàn chuẩn xác về hàm lượng và trọng lượng vàng, được kiểm định chặt chẽ bằng máy quang phổ.',
            '100% Trang sức kim cương đều có chứng nhận đạt tiêu chuẩn GIA.',
            'Toàn bộ sản phẩm trang sức tại Jemmia có đầy đủ hóa đơn, chứng từ chứng minh nguồn gốc xuất xứ và đầy đủ thông tin về hàm lượng, trọng lượng vàng.',
            'Toàn bộ sản phẩm trang sức tại Jemmia có đầy đủ hóa đơn, chứng từ chứng minh nguồn gốc xuất xứ và đầy đủ thông tin về hàm lượng, trọng lượng vàng.',
          ].map((text, index) => (
            <div className="row" key={index}>
              <div className="column1">
                <FaCheckCircle style={{ color: 'red' }} aria-hidden="true" />
              </div>
              <div className="column">
                <span style={{ fontSize: '14px', fontFamily: 'Arial' }}>
                  {text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitmentQuality;
