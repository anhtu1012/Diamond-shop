import "./index.scss";
import { FcPrint } from "react-icons/fc";
function NoData() {
  return (
    <div className="nodata_main" style={{minHeight:"350px"}}>
      <div>
        <FcPrint  size={200} />
      </div>
      <div className="text">Không có dữ liệu</div>
    </div>
  );
}

export default NoData;
