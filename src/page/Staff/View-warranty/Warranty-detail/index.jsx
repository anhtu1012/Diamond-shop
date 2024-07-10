/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWarrantyById } from "../../../../../services/Uservices";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import LoadingTruck from "../../../../components/loading";
import { Button, Col, Row } from "antd";
import { TiArrowBack } from "react-icons/ti";

function ViewWarrantyDetailS() {
  const { warrantyCardID } = useParams();
  const [loading, setLoading] = useState(true); // Add loading state
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const fetchWarrantyById = async () => {
      try {
        const res = await getWarrantyById(warrantyCardID);
        if (!Array.isArray(res.data)) {
          setDataSource([res.data]);
        } else {
          setDataSource(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchWarrantyById();
  }, [warrantyCardID]);

  const headerStyle = { fontSize: "16px", margin: "5px 0" };
  const paragraphStyle = {
    marginLeft: "20px",
    fontWeight: "300",
    marginBottom: "5px",
  };
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".section-main");
    if (!capture) {
      console.error("Element not found!");
      return;
    }
    setLoader(true);
    html2canvas(capture)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = (canvas.height * componentWidth) / canvas.width;
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save("phieu-bao-hanh.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        setLoader(false);
      });
  };

  const isWarrantyValid = (expirationDate) => {
    return moment().isBefore(moment(expirationDate));
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  if (!dataSource) {
    return <LoadingTruck />;
  }
  return (
    <div className="tong-chi-tiet-bao-hanh">
      <div
        className="infor-details"
        style={{ marginBottom: "20px", display: "flex" }}
      >
        <h2 style={{ fontWeight: "500" }}>Thông tin chi tiết phiếu bảo hành</h2>
        <h2 style={{ fontWeight: "500", marginLeft: "auto" }}>
          <Link
            to={"/staff-page/view-bao-hanh"}
            style={{ color: "black", fontWeight: 600 }}
          >
            <TiArrowBack style={{ justifyContent: "center" }} /> Quay lại
          </Link>
        </h2>
      </div>
      <Row className="section-main">
        <Col span={24} className="header-col">
          <Row className="row-head">
            <Col span={12} className="col-head1">
              Phiếu Bảo Hành :
              <span style={{ fontWeight: "bold" }}>
                {" "}
                #US{dataSource[0].userId}
              </span>
            </Col>
            <Col span={12} className="col-head2">
              <div className="stutuss">
                <Button>
                  {isWarrantyValid(dataSource[0].expirationDate)
                    ? "CÒN HẠN SỬ DỤNG"
                    : "HẾT HẠN SỬ DỤNG"}
                </Button>
              </div>
              <Button
                style={{ background: "#e70953", color: "white" }}
                onClick={downloadPDF}
              >
                {loader ? "Đang tải..." : "Xuất ra PDF"}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24} className="body-col">
          <Row>
            <Col span={8} style={{ paddingLeft: "20px" }}>
              <div style={{ padding: "10px 0px" }}>Từ:</div>
              <div className="info">
                <p className="title">Diamond King</p>
                <p>
                  Địa Chỉ: Nhà Văn Hóa Sinh Viên,Lưu Hữu Phước, Đông Hoà, Dĩ An,
                  Bình Dương
                </p>
                <p>Email: diamondking0909@gmail.xom</p>
                <p>Phone: 0231485231</p>
              </div>
            </Col>
            <Col span={8} style={{ paddingLeft: "20px" }}>
              <div style={{ padding: "10px 0px" }}>Đến:</div>
              <div className="info">
                <p className="title">{dataSource[0].fullName}</p>
                <p>Địa Chỉ: {dataSource[0].address}</p>
                <p>Email: {dataSource[0].email}</p>
                <p>Phone: {dataSource[0].phone}</p>
              </div>
            </Col>
            <Col span={8} style={{ paddingLeft: "20px" }}>
              <div style={{ padding: "10px 0px" }}>Chi Tiết:</div>
              <div className="info">
                <Link
                  style={{ color: "black" }}
                  to={`/staff-page/don-hang/order-detail/${dataSource[0].orderId}`}
                >
                  <p className="title">
                    Mã đơn hàng: #OD{dataSource[0].orderId}
                    <br />
                    <span style={{ fontWeight: "300" }}>
                      (^ có thể bấm vào để xem chi tiết )
                    </span>
                  </p>
                </Link>
                <p>Thời gian bảo hành: 2 năm</p>
                <p>Ngày Đặt: {formatDate(dataSource[0].purchaseDate)}</p>
                <p>Ngày Hết hạn: {formatDate(dataSource[0].expirationDate)}</p>
              </div>
            </Col>
          </Row>
          <Row gutter={40} style={{ padding: "20px" }}>
            <Col span={12}>
              <h4 style={headerStyle}>1. Điều Kiện Áp Dụng</h4>
              <p style={paragraphStyle}>
                <strong>Điều kiện bảo hành:</strong> Bảo hành chỉ áp dụng cho
                các lỗi liên quan đến chất lượng kim cương như độ tinh khiết,
                màu sắc, và cắt gọt không đúng với mô tả ban đầu.
              </p>
              <p style={paragraphStyle}>
                <strong>Điều kiện không bảo hành:</strong> Không áp dụng bảo
                hành cho các hư hỏng do tác động vật lý (va đập, rơi vỡ), mất
                mát, hoặc các tổn thất do việc sử dụng không đúng cách.
              </p>

              <h4 style={headerStyle}>2. Quyền Lợi Của Khách Hàng</h4>
              <p style={paragraphStyle}>
                <strong>Sửa chữa:</strong> Miễn phí sửa chữa hoặc điều chỉnh kim
                cương trong thời gian bảo hành.
              </p>
              <p style={paragraphStyle}>
                <strong>Đổi trả:</strong> Đổi kim cương mới nếu phát hiện lỗi từ
                nhà sản xuất.
              </p>
              <p style={paragraphStyle}>
                <strong>Hoàn tiền:</strong> Hoàn tiền 100% nếu sản phẩm không
                đáp ứng đúng các tiêu chí chất lượng đã cam kết.
              </p>

              <h4 style={headerStyle}>3. Quy Định Và Điều Kiện</h4>
              <p style={paragraphStyle}>
                <strong>Bảo quản phiếu:</strong> Phiếu bảo hành phải được giữ
                nguyên vẹn, không rách, không chỉnh sửa. Mất phiếu sẽ không được
                cấp lại.
              </p>
              <p style={paragraphStyle}>
                <strong>Kiểm định lại:</strong> Khách hàng có thể yêu cầu kiểm
                định lại chất lượng kim cương tại các trung tâm được ủy quyền
                nếu có nghi ngờ về chất lượng.
              </p>
              <p style={paragraphStyle}>
                <strong>Điều kiện bảo hành:</strong> Chỉ áp dụng cho các lỗi
                được xác định là do nhà sản xuất, không áp dụng cho các lỗi do
                sử dụng không đúng cách hoặc do tai nạn.
              </p>
            </Col>
            <Col span={12}>
              <h4 style={headerStyle}>4. Liên Hệ</h4>
              <p style={paragraphStyle}>
                <strong>Số điện thoại:</strong> 0123456789
              </p>
              <p style={paragraphStyle}>
                <strong>Email:</strong> support@diamondstore.com
              </p>
              <p style={paragraphStyle}>
                <strong>Địa chỉ bảo hành:</strong> 456 Đường XYZ, Phường UVW,
                Quận RST, Thành phố OPQ
              </p>
              <h4 style={headerStyle}>5. Hướng Dẫn Sử Dụng Sản Phẩm</h4>
              <p style={paragraphStyle}>
                <strong>Làm sạch:</strong> Sử dụng dung dịch làm sạch chuyên
                dụng cho kim cương, tránh các hóa chất mạnh.
              </p>
              <p style={paragraphStyle}>
                <strong>Bảo quản:</strong> Lưu trữ kim cương ở nơi khô ráo,
                tránh tiếp xúc trực tiếp với nhiệt độ cao hoặc các vật liệu cứng
                khác.
              </p>

              <h4 style={headerStyle}>6. Chính Sách Hoàn Trả</h4>
              <p style={paragraphStyle}>
                <strong>Cam kết hoàn trả:</strong> Hoàn trả 100% tiền mặt trong
                vòng 30 ngày nếu sản phẩm không đáp ứng được nhu cầu của bạn.
              </p>
              <p style={paragraphStyle}>
                <strong>Điều kiện hoàn trả:</strong> Sản phẩm phải còn nguyên
                vẹn và đầy đủ chứng nhận.
              </p>

              <h4 style={headerStyle}>7. Câu Hỏi Thường Gặp</h4>
              <p style={paragraphStyle}>
                Xem thêm câu hỏi thường gặp: Thông tin chi tiết và câu trả lời
                cho các thắc mắc liên quan đến bảo hành tại{" "}
                <Link href="FAQs">FAQs</Link>.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ViewWarrantyDetailS;
