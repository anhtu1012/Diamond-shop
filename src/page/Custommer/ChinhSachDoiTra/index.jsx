import { Content } from "antd/es/layout/layout";
import Container from "../../../components/container/Container";
import { Breadcrumb, Form, Row } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import Relate from "../../../components/carousel/related";
import { useEffect } from "react";
function ChinhSachDoiTra() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="banner">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/doi-tra.webp?alt=media&token=9b9c1262-c639-4d70-b614-464c78428c6e.jpg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <Container>
        <Content style={{ padding: "0 0px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Chính sách thu mua thu đổi và bảo hành
            </Breadcrumb.Item>
          </Breadcrumb>
        </Content>

        <div>
          <div className="bang-thu">
            <h2 className="bang-thu1"> A. TỈ LỆ THU ĐỔI</h2>
            <Row>
              <Form>NHÓM SẢN PHẨM</Form>
            </Row>
            <h3 className="bang-thu2">
              {" "}
              * Áp dụng tỷ lệ thu/ đổi theo giá trị thanh toán trên hóa đơn bán
              hàng.
            </h3>
            <h3 className="bang-thu2">
              * Áp dụng tỷ lệ đổi với giá trị thanh toán cao hơn, trường hợp đổi
              giá trị thấp hơn sẽ áp dụng tỷ lệ thu.{" "}
            </h3>
            <h3 className="bang-thu2">
              * Thời gian: tính từ ngày xuất hóa đơn bán hàng.
            </h3>
            <h3 className="bang-thu2">
              * Chính sách thu/ đổi áp dụng từ ngày 04/06/2023. Các trường hợp
              mua hàng trước ngày 04/06/2023 TGKC sẽ áp dụng tỷ lệ thu/đổi theo
              đúng chính sách đã cam kết trên hóa đơn.
            </h3>
            <h3 className="bang-thu2">
              * Trường hợp mất hóa đơn không xác định được chính sách thu đổi,
              Quý khách vui lòng liên hệ TGKC để được hỗ trợ
            </h3>
          </div>
        </div>

        <div className="dieu-kien">
          <h2 className="dieu-kien1">B. ĐIỀU KIỆN THU ĐỔI</h2>
          <div>
            <h3 className="dieu-kien2">
              - Đầy đủ Phiếu Bán Hàng, Giấy tờ tùy thân của khách hàng thu đổi.
            </h3>
            <h3 className="dieu-kien2">
              - Giấy Kiểm Định đầy đủ và nguyên vẹn (không gấp khúc, nhăn, bẩn
              ...).
            </h3>
            <h3 className="dieu-kien2">
              - Kim Cương phải còn nguyên vẹn (không bị trầy xước, nứt, mẻ…){" "}
            </h3>
            <h3 className="dieu-kien2">
              - Trang sức phải còn nguyên vẹn (không biến dạng, không rớt hạt,
              không cắt ngắn (đối với dây chuyền, dây tay, dây chân…).
            </h3>
            <h2 className="dieu-kien1">
              * Chính sách đổi (giá trị cao hơn) không mất phí trong vòng 48h kể
              từ khi mua hàng:
            </h2>
            <h3 className="dieu-kien2">
              - Sản phẩm đổi trong 48 giờ phải còn nguyên vẹn, chưa qua sử dụng,
              bao bì, giấy tờ chứng từ liên quan đính kèm, thông tin hóa đơn
              điện tử đầy đủ. Không áp dụng đối với hàng thiết kế theo nhu cầu
              riêng, sản phẩm nhẫn có size đặt lại ngoài khung chuẩn (Nữ nhỏ hơn
              6 và lớn hơn 16,nam nhỏ hơn 14 và lớn hơn 25), trang sức Platinum,
              các sản phẩm đã chỉnh sửa mẫu mã hoặc size so với ban đầu.
            </h3>
            <h3 className="dieu-kien2">
              - Đối với trang sức ổ đã vào viên, Khách hàng sẽ chi trả thêm chi
              phí tháo viên và sửa ổ chấu (tùy theo từng trường hợp cụ thể).
            </h3>
            <h2 className="dieu-kien1">
              *Sản phẩm không đủ điều kiện thu đổi:
            </h2>
            <h3 className="dieu-kien2">
              - TH1: Trang sức không còn nguyên vẹn: Công ty sẽ mua lại theo
              thỏa thuận hoặc có quyền từ chối không mua lại.
            </h3>
            <h3 className="dieu-kien2">
              - TH2: Giấy Kiểm định (GKĐ) bị mất hoặc GKĐ không nguyên vẹn: Công
              ty sẽ thu theo chính sách công bố và trừ phí GKĐ.
            </h3>
            <h3 className="dieu-kien2">
              - TH3: Kim cương không nguyên vẹn: Công ty sẽ mua lại theo thỏa
              thuận hoặc có quyền từ chối không mua lại dựa vào kết quả kiểm
              định; Khách hàng chịu chi phí KCV bị hạ cấp độ và phí cấp lại GKĐ.
            </h3>

            {/* PHÍ IN, CẤP GIẤY KIỂM ĐỊNH KIM CƯƠNG
            
Kích cỡ (KCV)	Phí in, cấp Giấy Kiểm Định Kim Cương (VND)
Dưới 3.4mm	1.000.000
Từ 3.4mm	1.400.000
Từ 4.2mm	2.000.000
Từ 5.4mm	3.000.000
Từ 7.2mm	5.000.000
Từ 8.1mm	7.000.000
Từ 9.0mm	10.000.000 */}
          </div>
        </div>
        <div className="thoi-gian">
          <h2 className="thoi-gian1">
            C. THỜI GIAN, ĐỊA ĐIỂM THU ĐỔI VÀ THANH TOÁN TIỀN THU HÀNG:
          </h2>
          <h3 className="thoi-gian2">** Thời gian thu đổi:</h3>
          <h3 className="thoi-gian3">
            - Tại TTTM Sence City Bến Tre, Cần Thơ, Cà Mau: Áp dụng thu đổi từ
            10h đến 15h hàng ngày (trừ thứ bảy, chủ nhật và ngày lễ), đồng thời
            không cấn trừ thu đổi qua quầy thu ngân của TTTM.
          </h3>
          <h3 className="thoi-gian3">
            - Các cửa hàng còn lại: Áp dụng thu đổi theo giờ hoạt động của cửa
            hàng.
          </h3>
          <h3 className="thoi-gian2">**Địa điểm thu – Đổi hàng:</h3>
          <h3 className="thoi-gian3">
            - Áp dụng tại toàn bộ hệ thống của TGKC ngoại trừ các cửa hàng dưới
            đây:
          </h3>
          <h3 className="thoi-gian3">
            - Tại TTTM Aeon Mall, Diamond Plaza, Nowzone, Robins, Lotte
            Department Store HN, Lotte Tây Hồ, Gold Coast: không áp dụng đổi
            hàng, chỉ áp dụng thu hàng bằng hình thức nhận tiền qua chuyển
            khoản, Khách hàng vui lòng đến cửa hàng TGKC thuộc các TTTM khác gần
            nhất để được thu hàng nhận tiền mặt hoặc đổi hàng.
          </h3>
          <h3 className="thoi-gian2">**Thời gian thanh toán tiền thu hàng:</h3>
          <h3 className="thoi-gian3">
            - Nếu thu từ 10h-15h (trừ T7, CN, ngày lễ): thanh toán tiền thu hàng
            cho KH trong ngày.
          </h3>
          <h3 className="thoi-gian3">
            - Sau 15h hoặc T7, CN, ngày lễ: thanh toán tiền thu hàng cho KH
            trong ngày làm việc hôm sau.
          </h3>
        </div>
        <div className="chinh-sachbh">
          <h2 className="chinh-sachbh1">D. CHÍNH SÁCH BẢO HÀNH:</h2>

          <h3 className="chinh-sachbh2">
            - Đánh bóng và xi mới sản phẩm miễn phí trong 5 năm nếu không có lỗi
            khác
          </h3>
          <h3 className="chinh-sachbh2">
            - Gắn đá CZ miễn phí trong 6 tháng đầu (nếu do lỗi kỹ thuật).
          </h3>
          <h3 className="chinh-sachbh2">
            - Lưu ý: Kim Cương tấm, ngọc trai, đá và các nguyên vật liệu khác
            đính trên sản phẩm bị mất, mẻ, bể, trầy, xước, mòn, nứt ...: sẽ tính
            công và nguyên vật liệu ( nếu có thể thay thế và sửa chữa được ).
          </h3>
          <h3 className="chinh-sachbh2">
            - TGKC sẽ không nhận bảo hành sản phẩm hoặc bảo hành tính phí khi
            Khách Hàng không xuất trình Phiếu Bán Hàng.
          </h3>
          <h3 className="chinh-sachbh2">
            - TGKC từ chối bảo hành đối với bất kỳ sản phẩm nào đã bị can thiệp
            bởi một đơn vị khác trước đó.
          </h3>
          <h3 className="chinh-sachbh2">
            - Phí bảo hành phụ thuộc vào tình trạng của sản phẩm được thẩm định
            và quyết định bởi các chuyên viên kỹ thuật của TGKC và được thông
            báo đến Khách Hàng trước khi sửa chữa.
          </h3>
          <h3 className="chinh-sachbh2">
            - Dòng Trang Sức Vàng ta 24k (999.9)
          </h3>
          <h3 className="chinh-sachbh2">
            + Làm mới chỉ rung sạch tại cửa hàng. Trường hợp bị lỗi khác sẽ được
            chuyển về Công Ty kiểm tra.
          </h3>
          <h3 className="chinh-sachbh2">
            + Không bảo hành phần đá gắn (đính) trên sản phẩm (nếu có)
          </h3>
          <h3 className="chinh-sachbh2">
            + Không bảo hành sản phẩm có chất làm đầy bằng chất liệu khác bên
            trong.
          </h3>
          <h3 className="chinh-sachbh2">
            + Không bảo hành sản phẩm bị gãy, móp, méo, biến dạng ... trong quá
            trình sử dụng.
          </h3>
        </div>
        <h2 style={{ padding: "30px", fontWeight: "400" }}>
          Có thể bạn quan tâm
        </h2>
        <Relate numberOfSlides={4} autoplay data="diamonds" />
      </Container>
    </div>
  );
}

export default ChinhSachDoiTra;
