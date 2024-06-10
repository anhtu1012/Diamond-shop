import Relate from "../../../components/carousel/related";
import Container from "../../../components/container/Container";
import { AiOutlineCheck } from "react-icons/ai";
import "./index.scss";
import { useEffect } from "react";

function HuongDan() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Container>
        <div className="intro">
          <div className="huong-dan">
            <div className="intro">
              <h1>Hướng Dẫn Cách Đo Ni Nhẫn Đơn Giản Tại Nhà</h1>
              <h4>POSTED ON 28 Tháng Năm, 2024 BY ADMIN</h4>
            </div>
            <div className="nhan-la-gi">
              <h2>Nhẫn là gì?</h2>
              <h3>
                Nhẫn là một mảnh ghép không thể thiếu trong mỗi outfit của bạn,
                món trang sức tuy nhỏ bé nhưng lại có sức hút kỳ diệu, chính là
                điểm nhấn giúp bạn tỏa sáng và thu hút mọi ánh nhìn. Tuy nhiên,
                để lựa chọn được chiếc nhẫn vừa vặn với bàn tay của mình cũng là
                điều cần cân nhắc kỹ. Hãy cùng Black Moon tìm hiểu về các bước
                đo ni nhẫn theo hướng dẫn đo size nhẫn dưới đây nhé.
              </h3>
            </div>
            <div className="do-ni">
              <h2>Hướng dẫn đo size với nhẫn có sẵn</h2>
              <h3>
                Nếu bạn đã có sẵn một chiếc nhẫn vừa vặn với ngón tay của mình,
                bạn có thể sử dụng cách sau để đo được độ rộng và biết được size
                nhẫn phù hợp với tay của mình:
              </h3>
              <h3 className="do-ni1">
                <AiOutlineCheck />
                Đặt chiếc nhẫn lên một mặt phẳng và lấy thước kẻ đường kính lòng
                trong của nhẫn.
              </h3>
              <h3 className="do-ni2">
                <AiOutlineCheck />
                Tiếp theo bạn sẽ đối chiếu số mm của thước với kích thước đường
                kính của bảng kích thước nhẫn bên dưới.
              </h3>
              <div className="img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/size-nhan.jpg?alt=media&token=2efc6a59-d10a-4741-b112-1eb89c42c13d"
                  style={{ width: "50%", marginTop: "20px" }}
                />
              </div>
            </div>
            <div className="huong-dan-do">
              <h2>Hướng dẫn cách đo nhẫn thủ công</h2>
              <h3>
                Nếu bạn vẫn không có mẫu nhẫn sẵn nào thì có thể áp dụng cách đo
                dưới đây để lựa chọn mình được size nhẫn phù hợp:
              </h3>
              <div className="huong-dan1">
                <h3>
                  Bước 1: Dùng một sợi dây (hoặc thước dây/ mảnh giấy bản nhỏ)
                  quấn quanh ngón tay đeo nhẫn, siết hơi chặt lại, đánh dấu chỗ
                  tiếp giáp.
                </h3>
                <h3>Bước 2: Đo chiều dài đoạn dây vừa đo.</h3>
                <h3>Bước 3: Sau đó chia cho 3.14 là đường kính nhẫn.</h3>
                <h3>
                  Bước 4: Bạn đối chiếu đường kính bạn vừa đo (theo mm) với bảng
                  kích thước nhẫn bên trên. Kích thước nhẫn của bạn tương ứng
                  với size số ghi dưới vòng tròn.
                </h3>
              </div>
              <div className="img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Huong-dan-do-ni.png?alt=media&token=baae852f-421c-4aed-8a52-d1327efc5874"
                  style={{ width: "50%", marginTop: "20px" }}
                />
              </div>
            </div>
            <div className="luu-y">
              <h2>Một số điều lưu ý khi đo ni nhẫn tại nhà</h2>
              <h3>
                Khi đo size nhẫn tại nhà bạn cần lưu ý những điều sau để có được
                kết quả chính xác nhất:
              </h3>
              <div className="luu-y-nha">
                <h3>
                  <AiOutlineCheck />
                  Đo lại nhiều lần: Trong quá trình đo size tay sẽ có sai lệch,
                  bạn nên đo từ 2-3 lần để có được kết quả chính xác nhất.
                </h3>
                <h3>
                  <AiOutlineCheck />
                  Nhiệt độ thời tiết khi đo: Nhiệt độ cũng khiến việc đo size
                  nhẫn không chính xác. Kích thước ngón tay sẽ nhỏ hơn 1 chút
                  khi thời tiết quá lạnh và ngược lại. Vì vậy, nên đo kích thước
                  ngón tay của bạn ở nhiệt độ trung bình, tốt nhất là vào cuối
                  ngày khi thời tiết ấm.
                </h3>
                <h3>
                  <AiOutlineCheck />
                  Độ dày của nhẫn: Mỗi loại nhẫn đều sẽ được thiết kế bằng những
                  chất liệu khác nhau, điều đó ảnh hưởng đến size nhẫn của người
                  đeo. Vì vậy khi đo, bạn cần tăng, giảm kích thước cho phù hợp
                  để đeo nhẫn không bị quá chật hoặc quá rộng.
                </h3>
                <h3>
                  <AiOutlineCheck />
                  Lưu ý đến các khớp tay: Phần khớp ở giữa ngón tay thường sẽ to
                  hơn so với phần gốc tay một chút, cho nên sẽ có trường hợp đo
                  size tay chuẩn nhưng khi qua khớp lại bị vướng. Để tránh tình
                  trạng đó, bạn nên bên dưới khớp tay và khu vực gốc ngón tay,
                  sau đó lấy kết quả trung bình của 2 lần đo. Trong trường hợp
                  khớp ngón tay của bạn to, hãy đo chu vi ở khớp sao cho khi đeo
                  nhẫn sẽ không bị vướng lại nhưng cũng không quá rộng khiến
                  nhẫn bị tuột.
                </h3>
              </div>
              <div className="img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/luu-y-khi-do-ni-nhan.jpg?alt=media&token=6279c759-11d7-4f44-954d-23134b595635"
                  style={{ width: "50%", marginTop: "20px" }}
                />
              </div>
            </div>
            <div className="cach-khac">
              <h2>Tham khảo những cách đo ni nhẫn khác</h2>
              <div className="cach-khac-nha">
                <h3>
                  Ngoài những cách đo phổ biến và thông dụng ở trên thì còn có
                  rất nhiều cách đo khác để bạn có thể tham khảo và đo được size
                  nhẫn phù hợp cho ngón tay của bạn như đo theo tỷ lệ cân nặng,
                  đo nhẫn qua tờ tiền,…Nhưng những cách đo này chỉ mang lại kết
                  quả tương đối.
                </h3>
                <h3>
                  Để chính xác nhất các khách hàng có thể qua trực tiếp showroom
                  của Black Moon Luxury Diamond, chúng tôi sẽ thực hiện đo size
                  nhẫn chính xác để bạn có thể lựa chọn được chiếc nhẫn phù hợp
                  nhất với bản thân.
                </h3>
                <h3>
                  Hy vọng với qua bài viết hướng dẫn đo ni tay ở trên sẽ giúp
                  bạn lựa chọn được chiếc nhẫn vừa vặn và ưng ý.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="product-relate">
          <h2>Các sản phẩm bạn có thể thích</h2>
          <Relate
            numberOfSlides={4}
            autoplay
            category="Nhẫn Cầu Hôn Kim Cương"
          />
        </div>
      </Container>
    </div>
  );
}

export default HuongDan;
