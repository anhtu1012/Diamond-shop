import { Content } from "antd/es/layout/layout";
import Container from "../../../components/container/Container";
import { Breadcrumb, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import "./index.scss";
import Relate from "../../../components/carousel/related";
import { useEffect } from "react";
function ChinhSachBaoMat() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col span={24}>
            <Content style={{ padding: "0 0px" }}>
              <Breadcrumb style={{ margin: "16px 0", marginRight: "10px" }}>
                <Breadcrumb.Item>
                  <Link to="/">Trang chủ</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  Chính Sách Bảo Mật Diamond Cho Quý Khách Hàng
                </Breadcrumb.Item>
              </Breadcrumb>
            </Content>
          </Col>
        </Row>
        <div className="intro">
          <div className="tong-quan">
            <h3 className="so-quan">
              Cảm ơn bạn đã truy cập vào trang website được vận hành bởi Cửa
              hàng kim cương Diamond. Chúng tôi tôn trọng và cam kết sẽ bảo mật
              những thông tin mang tính riêng tư của bạn. Xin vui lòng đọc bản
              Chính sách bảo vệ thông tin cá nhân của người tiêu dùng dưới đây
              để hiểu hơn những cam kết mà chúng tôi thực hiện nhằm tôn trọng và
              bảo vệ quyền lợi của người truy cập.
            </h3>
            <h3 className="so-quan1">
              Bảo vệ thông tin cá nhân của người tiêu dùng và gây dựng được niềm
              tin cho bạn là vấn đề rất quan trọng với chúng tôi. Vì vậy, chúng
              tôi sẽ dùng tên và các thông tin khác liên quan đến bạn tuân thủ
              theo nội dung của chính sách này. Chúng tôi chỉ thu thập những
              thông tin cần thiết liên quan đến giao dịch mua bán.
            </h3>
          </div>

          <div className="chinh-sach">
            <h2 className="chinh-sach1">
              CHÍNH SÁCH BẢO VỆ THÔNG TIN CÁ NHÂN CỦA NGƯỜI TIÊU DÙNG
            </h2>
            <h3 className="chinh-sach2">
              Người Tiêu Dùng hoặc Khách hàng sẽ được yêu cầu điền đầy đủ các
              thông tin theo các trường thông tin theo mẫu có sẵn trên Website
              diamond.vn như: Họ và Tên, địa chỉ (nhà riêng hoặc văn phòng), địa
              chỉ email (công ty hoặc cá nhân), số điện thoại (di động, nhà
              riêng hoặc văn phòng), các chi tiết thẻ tín dụng (là loại và số
              thẻ tín dụng, mã CVC, ngày tháng hết hạn, tên chủ thẻ) và trong
              mức độ có thể, các tuỳ chọn… Thông tin này được yêu cầu để đặt và
              hoàn tất việc đặt hàng online của Khách hàng (bao gồm gửi email
              xác nhận đặt hàng đến Khách hàng).
            </h3>
          </div>
          <div className="muc-dich">
            <h2 className="muc-dich1">
              MỤC ĐÍCH THU THẬP THÔNG TIN CÁ NHÂN CỦA NGƯỜI TIÊU DÙNG
            </h2>
            <h3 className="muc-dich2">
              Cung cấp dịch vụ cho Khách hàng và quản lý, sử dụng thông tin cá
              nhân của Người Tiêu Dùng nhằm mục đích quản lý cơ sở dữ liệu về
              Người Tiêu Dùng và kịp thời xử lý các tình huống phát sinh (nếu
              có).
            </h3>
            <div className="pham-vi">
              <h2 className="pham-vi1">PHẠM VI SỬ DỤNG THÔNG TIN CÁ NHÂN</h2>
              <h3 className="pham-vi2">
                Website Diamond.vn sử dụng thông tin của Người Tiêu Dùng cung
                cấp để:
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Cung cấp các dịch vụ đến Người Tiêu Dùng;
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Gửi các thông báo về các hoạt động trao đổi thông tin giữa Người
                Tiêu Dùng và Diamond;
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Ngăn ngừa các hoạt động phá hủy, chiếm đoạt tài khoản người dùng
                của Người Tiêu Dùng hoặc các hoạt động giả mạo Người Tiêu Dùng;
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Liên lạc và giải quyết khiếu nại với Người Tiêu Dùng;
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Xác nhận và trao đổi thông tin về giao dịch của Người Tiêu Dùng
                tại Diamond;
              </h3>
              <h3 className="pham-vi2">
                <LuDot />
                Trong trường hợp có yêu cầu của cơ quan quản lý nhà nước có thẩm
                quyền.
              </h3>
            </div>
            <div className="thoi-gian-luu">
              <h2 className="thoi-gian-luu1">
                THỜI GIAN LƯU TRỮ THÔNG TIN CÁ NHÂN
              </h2>
              <h3 className="thoi-gian-luu2">
                Không có thời hạn ngoại trừ trường hợp Người Tiêu Dùng gửi có
                yêu cầu hủy bỏ tới cho Ban quản trị hoặc Công ty giải thể hoặc
                bị phá sản.
              </h3>
            </div>
            <div className="nguoi-or-tochuc">
              <h2 className="nguoi-or-tochuc1">
                NHỮNG NGƯỜI HOẶC TỔ CHỨC CÓ THỂ ĐƯỢC TIẾP CẬN VỚI THÔNG TIN CÁ
                NHÂN CỦA NGƯỜI TIÊU DÙNG
              </h2>
              <h3 className="nguoi-or-tochuc2">
                Người Tiêu Dùng đồng ý rằng, trong trường hợp cần thiết, các cơ
                quan/ tổ chức/cá nhân sau có quyền được tiếp cận và thu thập các
                thông tin cá nhân của mình, bao gồm:
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Ban quản trị.
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Bên thứ ba có dịch vụ tích hợp với Website Diamond.vn
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Công ty tổ chức sự kiện và nhà tài trợ
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Cơ quan nhà nước có thẩm quyền trong trường hợp có yêu cầu theo
                quy định tại quy chế hoạt động
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Công ty nghiên cứu thị trường
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Cố vấn tài chính, pháp lý và Công ty kiểm toán
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Bên khiếu nại chứng minh được hành vi vi phạm của Người Tiêu
                Dùng
              </h3>
              <h3 className="nguoi-or-tochuc2">
                <LuDot />
                Theo yêu cầu của cơ quan nhà nước có thẩm quyền
              </h3>
            </div>
            <div className="dia-chi">
              <h2 className="dia-chi1">
                ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP VÀ QUẢN LÝ THÔNG TIN
              </h2>
              <h3 className="dia-chi2">Công ty cổ phần Diamond</h3>
              <h3 className="dia-chi2">
                <LuDot />
                Địa chỉ: 72 Nguyễn Cư Trinh, P. Phạm Ngũ Lão, Quận 1, Tp. Hồ Chí
                Minh
              </h3>
              <h3 className="dia-chi2">
                <LuDot />
                Điện thoại: 0911 311 422
              </h3>
              <h3 className="dia-chi2">
                <LuDot />
                Email: Shopdiamond@gmail.com
              </h3>
            </div>
            <div className="phuong-tien">
              <h2 className="phuong-tien1">
                PHƯƠNG TIỆN VÀ CÔNG CỤ ĐỂ NGƯỜI TIÊU DÙNG TIẾP CẬN VÀ CHỈNH SỬA
                DỮ LIỆU THÔNG TIN CÁ NHÂN CỦA MÌNH
              </h2>
              <h3 className="phuong-tien2">
                Người Tiêu Dùng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc
                hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào
                Website Diamond.vn và chỉnh sửa thông tin cá nhân hoặc yêu cầu
                Ban quản trị thực hiện việc này.
              </h3>
              <h3 className="phuong-tien2">
                Các hình thức tiếp nhận thông tin khiếu nại của Người Tiêu Dùng:
                <h3 className="phuong-tien2">
                  <LuDot />
                  Qua email: Shopdiamond@gmail.com
                </h3>
                <h3 className="phuong-tien2">
                  <LuDot />
                  Qua điện thoại: 0911 311 422
                </h3>
              </h3>
            </div>
            <div className="cam-ket">
              <h2 className="cam-ket1">
                CAM KẾT BẢO MẬT THÔNG TIN CÁ NHÂN CỦA NGƯỜI TIÊU DÙNG
              </h2>
              <h3 className="cam-ket2">
                Thông tin cá nhân của Người Tiêu Dùng trên Website diamond.vn
                được Ban quản trị cam kết bảo mật tuyệt đối theo chính sách bảo
                mật thông tin cá nhân được đăng tải trên Website diamond.vn.
                Việc thu thập và sử dụng thông tin của mỗi Người Tiêu Dùng chỉ
                được thực hiện khi có sự đồng ý của Người Tiêu Dùng trừ những
                trường hợp pháp luật có quy định khác và quy định này.
              </h3>
              <h3 className="cam-ket2">
                Không sử dụng, không chuyển giao, cung cấp hoặc tiết lộ cho bên
                thứ 3 về thông tin cá nhân của Người Tiêu Dùng khi không có sự
                đồng ý của Người Tiêu Dùng ngoại trừ các trường hợp được quy
                định tại quy định này hoặc quy định của pháp luật.
              </h3>
              <h3 className="cam-ket2">
                Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công
                dẫn đến mất mát dữ liệu cá nhân của Người Tiêu Dùng, Ban quản
                trị có trách nhiệm thông báo và làm việc với cơ quan chức năng
                điều tra và xử lý kịp thời, đồng thời thông báo cho Người Tiêu
                Dùng được biết về vụ việc.
              </h3>
              <h3 className="cam-ket2">
                Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Người
                Tiêu Dùng bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại
                khu vực dữ liệu trung tâm an toàn cấp 1 của Diamond.
              </h3>
            </div>
            <div className="co-che">
              <h2 className="co-che1">
                CƠ CHẾ TIẾP NHẬN VÀ GIẢI QUYẾT KHIẾU NẠI LIÊN QUAN ĐẾN VIỆC
                THÔNG TIN CỦA NGƯỜI TIÊU DÙNG
              </h2>
              <h3 className="co-che2">
                Khi phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích
                hoặc phạm vi, Người Tiêu Dùng gửi email khiếu nại đến email
                Shopdiamond@gmail.com hoặc gọi điện thoại tới số 0911 311 422 để
                khiếu nại và cung cấp chứng cứ liên quan tới vụ việc cho Ban
                quản trị. Ban quản trị cam kết sẽ phản hồi ngay lập tức hoặc
                muộn nhất là trong vòng 24 (hai mươi tư) giờ làm việc kể từ thời
                điểm nhận được khiếu nại.
              </h3>
            </div>
            <div className="tra-loi">
              <h2 className="tra-loi1"> Trả lời</h2>
              <h3 className="tra-loi2">
                Email của bạn sẽ không được hiển thị công khai. Các trường bắt
                buộc được đánh dấu *
              </h3>
              <h3 className="tra-loi2">Bình luận*</h3>
            </div>
          </div>
          <div className="binhluan">
            <Row>
              <Form.Item name="comment">
                <Input
                  className="input"
                  placeholder=""
                  style={{
                    width: "100%",
                    height: "100px",
                    marginRight: "670px",
                  }}
                />
              </Form.Item>
            </Row>
          </div>
          <div className="ten">
            <Row>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Xin hãy nhập vào Name!" }]}
              >
                <Input
                  className="input"
                  placeholder="Họ và tên*"
                  style={{ width: "300px", height: "40px" }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Xin hãy nhập vào Name!" }]}
              >
                <Input
                  className="input"
                  placeholder="Email*"
                  style={{
                    width: "300px",
                    height: "40px",
                    marginRight: "20px",
                    marginLeft: "20px",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="web"
                rules={[{ required: true, message: "Xin hãy nhập vào Name!" }]}
              >
                <Input
                  className="input"
                  placeholder="Trang Web*"
                  style={{ width: "300px", height: "40px" }}
                />
              </Form.Item>
            </Row>
          </div>
        </div>
        <h2 style={{ padding: "30px", fontWeight:"400" }}>Có thể bạn quan tâm</h2>
          <Relate numberOfSlides={4} autoplay category="NHẪN KIM CƯƠNG" />
      </Container>
    </div>
  );
}

export default ChinhSachBaoMat;
