/* eslint-disable react/prop-types */
import { UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { Avatar, Collapse, Rate } from "antd";
import moment from "moment";
const text1 = (
  <div>
    <h4>Trang Sức Kim Cương Tại Diamond King</h4>
    <ul className="custom-list">
      <li className="custom-list-item">
        Trang Sức Đa Dạng Mẫu Mã, Thiết Kế Theo Cá Nhân Hoá.
      </li>
      <li className="custom-list-item">
        Trang Thiết Bị Công Nghệ Kiểm Định Hiện Đại Nhất.
      </li>
      <li className="custom-list-item">
        Trải Nghiệm Dịch Vụ Kim Cương Đẳng Cấp.
      </li>
    </ul>
    <h4>Kim Cương Viên Tại Diamond King</h4>
    <ul className="custom-list">
      <li className="custom-list-item">Có giấy Kiểm Định GIA</li>
      <li className="custom-list-item">Có xuất Hoá Đơn VAT</li>
      <li className="custom-list-item">Nhập Khẩu Hải Quan Chính Ngạch</li>
    </ul>
  </div>
);

const text2 = (
  <ul className="custom-list">
    <li className="custom-list-item">
      Miễn phí trọn đời dịch vụ đánh bóng và làm mới sản phẩm.
    </li>
    <li className="custom-list-item">
      Miễn phí bảo hành 06 tháng đối với lỗi kỹ thuật và nước xi.
    </li>
    <li className="custom-list-item">
      Miễn phí dịch vụ kiểm tra kim cương thiên nhiên với thiết bị tân tiến từ
      GIA.
    </li>
    <li className="custom-list-item">
      Miễn phí điều chỉnh kích thước trang sức (trong trường hợp cần bù thêm
      vàng cho sản phẩm, quý khách sẽ chịu chi phí phát sinh tính theo giá vàng
      niêm yết)
    </li>
    <li className="custom-list-item">Chính sách thu mua, thu đổi hấp dẫn.</li>
    <li className="custom-list-item">
      Chính sách ưu đãi hấp dẫn dành riêng cho khách hàng thành viên, VIP/VVIP.
    </li>
    <li className="custom-list-item">
      Chương trình giới thiệu khách hàng với chiết khấu cao và ưu đãi dành riêng
      cho khách hàng được giới thiệu.
    </li>
  </ul>
);
const text3 = (
  <div>
    <h4>Nếu nhận hàng mà sản phẩm không đạt chất lượng thì sao?</h4>
    <ul className="custom-list">
      <li className="custom-list-item">
        Quý khách hàng vui lòng liên hệ với tư vấn viên trong vòng 24 GIỜ kể từ
        khi nhận sản phẩm, Diamond King sẽ hỗ trợ đổi hàng hoàn toàn miễn phí
        trong trường hợp sản phẩm bị lỗi do sản xuất.
      </li>
    </ul>
    <h4>Mua hàng online làm sao biết kích thước nhẫn nào vừa tay?</h4>
    <ul className="custom-list">
      <li className="custom-list-item">
        Diamond King sẽ gửi tặng bộ đo ni tay đến tận nơi của Quý khách hoàn
        toàn miễn phí. Bạn chỉ cần chọn ni nhẫn phù hợp và thông báo với tư vấn
        viên của chúng tôi. Ngoài ra, Diamond King hỗ trợ điều chỉnh size nhẫn
        miễn phí trọn đời trong trường hợp bạn muốn thay đổi.
      </li>
    </ul>
    <h4>Có gì để chứng minh tôi đã mua sản phẩm của Diamond King không?</h4>
    <ul className="custom-list">
      <li className="custom-list-item">
        Sản phẩm Diamond King được đảm bảo tính pháp lý qua 03 loại chứng từ
        sau: hóa đơn bán hàng, hợp đồng mua bán và hóa đơn VAT đảm bảo mọi quyền
        lợi của khách hàng.
      </li>
    </ul>
    <h4>Diamond King có thiết kế sản phẩm theo yêu cầu không?</h4>
    <ul className="custom-list">
      <li className="custom-list-item">
        Diamond King rất hân hạnh được cùng bạn tạo nên những thiết kế trang sức
        độc bản. Chúng tôi sẵn sàng lắng nghe ý tưởng, phác thảo, hoàn thiện và
        gia công theo yêu cầu riêng của bạn.
      </li>
    </ul>
  </div>
);

function ToggleTab({ feedBacks }) {
  const text4 = (
    <div>
      {feedBacks.map((feedback, index) => (
        <div key={index} className="review">
          <div className="review-header">
            <Avatar className="reviewer-avatar" icon={<UserOutlined />} />
            <div>
              <span className="reviewer-name">{feedback.fullName}</span>
              <span className="verified-buyer">
                {moment(feedback.createAt).format("DD-MM-YYYY HH:mm:ss")}
              </span>
            </div>
          </div>
          <div className="review-rating">
            <Rate disabled defaultValue={feedback.rating} className="stars" />
          </div>
          <div className="review-details">
            <div>{feedback.comment}</div>
          </div>
          <div className="review-actions">
            <span className="share">Share</span> |{" "}
            <span className="comments">Comments (1)</span>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="dropdown">
      <Collapse
        size="small"
        style={{ width: 500, border: "none" }}
        items={[
          {
            key: "1",
            label: <strong>Vì sao chọn Diamond King</strong>,
            children: <pre style={{ whiteSpace: "pre-wrap" }}>{text1}</pre>,
          },
        ]}
      />
      <Collapse
        size="small"
        style={{ width: 500, border: "none" }}
        items={[
          {
            key: "2",
            label: <strong>Dịch vụ sau mua</strong>,
            children: <pre style={{ whiteSpace: "pre-wrap" }}>{text2}</pre>,
          },
        ]}
      />
      <Collapse
        size="small"
        style={{ width: 500, border: "none" }}
        items={[
          {
            key: "3",
            label: <strong>Các câu hỏi thường gặp</strong>,
            children: <pre style={{ whiteSpace: "pre-wrap" }}>{text3}</pre>,
          },
        ]}
      />
      <Collapse
        size="small"
        style={{ width: 500, border: "none" }}
        items={[
          {
            key: "4",
            label: <strong>Bình luận và đánh giá</strong>,
            children: <pre style={{ whiteSpace: "pre-wrap" }}>{text4}</pre>,
          },
        ]}
      />
    </div>
  );
}

export default ToggleTab;
