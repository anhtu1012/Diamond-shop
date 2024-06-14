import { Content } from "antd/es/layout/layout";
import Container from "../../../components/container/Container";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import "./index.scss";
import Relate from "../../../components/carousel/related";
import { useEffect } from "react";
function AboutDiamond() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container>
        <Content style={{ padding: "0 0px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Vì sao lại chọn Diamond?</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
        <div className="vi-sao">
          <h2 className="vi-sao1">Vì sao lại chọn Diamond ?</h2>
          <h3 className="vi-sao2">
            Trên thị trường hiện nay, việc lựa chọn một địa chỉ cung cấp kim
            cương uy tín để đặt niềm tin đang trở nên khó khăn hơn bao giờ hết.
            Với hàng chục cửa hàng và thương hiệu cung cấp kim cương khác nhau,
            khách hàng luôn đối diện với sự đa dạng, phong phú của các sản phẩm
            và khó tự phân biệt được đâu là sản phẩm chất lượng. Mỗi người sẽ có
            những tiêu tiêu chí khác nhau khi lựa chọn kim cương, tuy nhiên điểm
            chung của hầu hết khách hàng đó là sự ưu tiên về nguồn gốc, chất
            lượng, mẫu mã và giá cả. Diamond là một chuyên gia kim cương hàng
            đầu Việt Nam đáp ứng được những tiêu chí ấy và hơn thế nữa. Hãy cùng
            khám phá bài viết sau để tìm hiểu lý do “Vì sao chọn Diamond ”, bạn
            nhé!
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/doi-tra.webp?alt=media&token=9b9c1262-c639-4d70-b614-464c78428c6e.jpg"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: " 13px", fontStyle: "italic" }}>
              Trang sức kim cương của Diamond
            </span>
          </div>
        </div>
        <div className="thi-truong">
          <h2 className="thi-truong1">Thị Trường Kim Cương Tại Việt Nam</h2>
          <h2 className="thi-truong1">
            Khái Quát Đôi Nét Về Thị Trường Kim Cương Việt Nam Hiện Nay
          </h2>
          <h3 className="thi-truong2">
            Thị trường kim cương tại Việt Nam có sự phát triển đáng kể trong
            những năm gần đây. Với sự gia tăng về thu nhập và nhận thức giá trị
            của đá quý, người tiêu dùng Việt Nam đang ngày càng có niềm đam mê
            với kim cương và trang sức kim cương. Không chỉ đơn thuần là một món
            trang sức, kim cương đang trở thành biểu tượng của vẻ đẹp và sự vĩnh
            cửu.
          </h3>
          <h3 className="thi-truong2">
            Tuy nhiên, điều đáng lưu ý là thị trường kim cương tại Việt Nam cũng
            tồn tại một nỗi đau. Sự đa dạng về cửa hàng và thương hiệu cung cấp
            kim cương đã tạo ra một môi trường cạnh tranh khốc liệt, đặc biệt là
            đối với những người mới bước chân vào thị trường. Vì thế Khách hàng
            luôn tự đặt ra những câu hỏi quan trọng về chất lượng, giá trị, và
            nguồn gốc của sản phẩm kim cương mà họ đang và sẽ đầu tư.
          </h3>
          <h2 className="thi-truong1">Vì Sao Chọn Diamond?</h2>
          <h3 className="thi-truong2">
            Trong bối cảnh này, nhu cầu của khách hàng về ngành hàng kim cương
            không chỉ dừng lại ở việc tìm kiếm một viên đá quý đẹp mắt. Họ còn
            quan tâm đến những giá trị ẩn sau từng viên kim cương, sự đáng tin
            cậy của nhà cung cấp, và chắc chắn rằng mỗi đồng tiền họ chi trả
            xứng đáng với sản phẩm mà họ nhận được. Vậy vì sao Diamond lại là
            thương hiệu nổi bật, nhận được nhiều sự tin tưởng trong thị trường
            kim cương Việt Nam hiện nay?
          </h3>
          <h2 className="thi-truong1">Trang Sức Kim Cương Tại Diamond</h2>
          <h2 className="thi-truong1">
            Trang Sức Đa Dạng Mẫu Mã, Thiết Kế Theo Cá Nhân Hoá
          </h2>
          <h3 className="thi-truong2">
            Tại Diamond, không chỉ đa dạng về mẫu mã và phong cách, chúng tôi
            còn tự hào về khả năng thiết kế trang sức riêng theo yêu cầu và mong
            muốn của khách hàng. Với sự tận tâm và tài năng của đội ngũ thợ lành
            nghề, chúng tôi có thể “biến” những ý tưởng của bạn thành món trang
            sức hoàn hảo. Cho dù bạn đang tìm kiếm một món quà đặc biệt, muốn
            thể hiện phong cách riêng của bạn, hay đơn giản là muốn một món
            trang sức để nói lên tình cảm của mình, Diamond luôn sẵn sàng tạo ra
            những tác phẩm trang sức độc nhất, nêu cao tinh thần sáng tạo và sự
            cá nhân hóa.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/doi-tra.webp?alt=media&token=9b9c1262-c639-4d70-b614-464c78428c6e.jpg"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Diamond thiết kế trang sức theo cá nhân hóa
            </span>
          </div>
          <h2 className="thi-truong1">
            Trang Thiết Bị Công Nghệ Kiểm Định Hiện Đại Nhất
          </h2>
          <h3 className="thi-truong2">
            Chúng tôi cam kết đảm bảo chất lượng và giá trị thực sự của từng
            viên kim cương tại Diamond bằng cách sử dụng trang thiết bị công
            nghệ kiểm định hiện đại nhất. Một trong những công cụ quan trọng và
            đáng tin cậy nhất mà chúng tôi sử dụng là máy GIA ID100. Đây là một
            công cụ kiểm định tiên tiến, giúp xác định chính xác kim cương thiên
            nhiên trong vòng 2 giây.
          </h3>
          <h3 className="thi-truong2">
            Sự kết hợp giữa sự khéo léo của những nghệ nhân và sự chính xác của
            công nghệ kiểm định như máy GIA ID100 đảm bảo rằng bạn luôn nhận
            được kim cương tốt nhất, đáp ứng hoặc vượt qua mọi tiêu chuẩn cao
            cấp.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/may-kiem-tra.jpg?alt=media&token=5139de36-c072-4469-bbf0-1a577574b1ba"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Máy kiểm tra kim cương GIA iD100®
            </span>
          </div>
          <h2 className="thi-truong1">
            Trải Nghiệm Dịch Vụ Kim Cương Đẳng Cấp
          </h2>
          <h3 className="thi-truong2">
            Tại Diamond, chúng tôi không chỉ tập trung vào việc cung cấp những
            sản phẩm kim cương đẳng cấp mà còn đặt sự thoải mái và hài lòng của
            từng vị khách hàng lên hàng đầu. Đó là lý do tại sao chúng tôi mang
            đến khách hàng một trải nghiệm mua sắm kim cương khác biệt.
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/sanh-cho.jpg?alt=media&token=01dc1a61-c3df-4b3f-971e-9cda8e709d0e://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/may-kiem-tra.jpg?alt=media&token=5139de36-c072-4469-bbf0-1a577574b1ba"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Trải Nghiệm dịch vụ đẳng cấp khi mua kim cương tại Diamond
            </span>
          </div>
          <h3 className="thi-truong2">
            Tại phòng VIP riêng biệt, được thiết kế theo những lối kiến trúc
            khác nhau, bạn sẽ được đón tiếp và tận hưởng không gian riêng tư,
            sang trọng cùng với những tách trà thượng hạng. Vừa ngắm sản phẩm
            vừa thưởng thức trà bánh cùng với sự tư vấn chuyên nghiệp từ đội ngũ
            nhân viên giàu kinh nghiệm của Diamond.
          </h3>
          <h2 className="thi-truong1">Kim Cương Viên Tại Diamond</h2>
          <h3 className="thi-truong3">
            <LuDot />
            Giấy Kiểm Định GIA
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/sanh-cho.jpg?alt=media&token=01dc1a61-c3df-4b3f-971e-9cda8e709d0e://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/may-kiem-tra.jpg?alt=media&token=5139de36-c072-4469-bbf0-1a577574b1ba"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Kim cương khi mua tại Diamond đều có giấy kiểm định GIA
            </span>
          </div>
          <h3 className="thi-truong2">
            Diamond luôn đặt cam kết trong việc cung cấp những viên kim cương
            nhập khẩu chính ngạch, được đi kèm với Giấy chứng nhận từ tổ chức
            kiểm định GIA – Viện Ngọc học Hoa Kỳ. Giấy chứng nhận GIA cung cấp
            cho quý khách hàng các thông tin chính xác về các thông số quan
            trọng liên quan đến chất lượng của sản phẩm kim cương. Do đó,
            Diamond luôn tự tin mang đến cho khách hàng sự tin tưởng hoàn toàn
            về chất lượng và giá trị của sản phẩm.
          </h3>
          <h3 className="thi-truong3">
            <LuDot />
            Xuất Hoá Đơn VAT
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/sanh-cho.jpg?alt=media&token=01dc1a61-c3df-4b3f-971e-9cda8e709d0e://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/may-kiem-tra.jpg?alt=media&token=5139de36-c072-4469-bbf0-1a577574b1ba"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Kim cương khi mua tại Diamond có xuất hóa đơn VAT
            </span>
          </div>
          <h3 className="thi-truong2">
            Khách hàng sẽ nhận được hóa đơn VAT khi mua sản phẩm kim cương tại
            Diamond. Đây là hóa đơn đảm bảo về pháp lý khi giao dịch mua bán,
            đảm bảo tính minh bạch của sản phẩm. Bên cạnh đó, hóa đơn giá trị
            gia tăng (VAT) còn giúp khách hàng xác định quyền sở hữu đối với sản
            phẩm. Từ đó có thể đảm bảo quyền lợi cho khách hàng về sau khi sản
            phẩm có vấn đề về chất lượng, dịch vụ cũng như các chế độ bảo hành,…
          </h3>
          <h3 className="thi-truong3">
            <LuDot />
            Nhập Khẩu Hải Quan Chính Ngạch
          </h3>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/sanh-cho.jpg?alt=media&token=01dc1a61-c3df-4b3f-971e-9cda8e709d0e://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/may-kiem-tra.jpg?alt=media&token=5139de36-c072-4469-bbf0-1a577574b1ba"
            style={{
              width: "50%",
              display: " block",
              margin: "0 auto",
              paddingTop: "20px",
            }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: " 13px", fontStyle: "italic", color: "grey" }}
            >
              Kim cương khi mua tại Diamond được nhập khẩu hải quan chính ngạch
            </span>
          </div>
          <h3 className="thi-truong2">
            Tờ khai hải quan luôn được Diamond cung cấp cho tất cả các sản phẩm
            kim cương nhập khẩu chính ngạch tại cửa hàng. Tờ khai hải quan là
            giấy tờ pháp lý quan trọng với mục đích chứng minh nguồn gốc và sự
            hợp pháp của kim cương được nhập khẩu. Đảm bảo rằng sản phẩm bạn sở
            hữu được nhập khẩu chính ngạch.
          </h3>
          <h2 className="thi-truong1">
            Chọn Diamond– Chọn Kim Cương Chất Lượng
          </h2>

          <h3 className="thi-truong2">
            Diamond tự hào là một trong những địa chỉ hàng đầu trong lĩnh vực
            kim cương tại Việt Nam. Chúng tôi luôn cam kết đem đến sự tinh tế và
            đẳng cấp qua từng viên kim cương, qua từng dịch vụ phục vụ khách
            hàng, và qua từng trải nghiệm mua sắm.
          </h3>
          <h3 className="thi-truong2">
            Hãy để Diamond điểm tô cuộc sống của bạn bằng những viên kim cương
            lấp lánh, và để chúng tôi đồng hành cùng bạn trong những khoảnh khắc
            quý báu của cuộc đời. Vì vậy, khi bạn đặt ra câu hỏi, “Vì sao chọn
            Diamond?” – câu trả lời chắc chắn sẽ là sự tinh tế, đẳng cấp, và
            đáng tin cậy.
          </h3>
        </div>
        <h2 style={{ padding: "30px", fontWeight: "400" }}>
          Có thể bạn quan tâm
        </h2>
        <Relate numberOfSlides={4} autoplay category="NHẪN KIM CƯƠNG" />
      </Container>
    </div>
  );
}

export default AboutDiamond;
