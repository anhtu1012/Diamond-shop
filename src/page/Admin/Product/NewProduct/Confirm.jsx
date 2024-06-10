/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Result, Button, message } from "antd";
import { FcReadingEbook } from "react-icons/fc";
import uploadFile from "../../../../utils/upload";
import { createProduct } from "../../../../../services/Uservices";

function Confirm({ onFinish, combinedData }) {
  console.log("Combined Data in Confirm:", combinedData);
  const handleConfirm = async () => {
    try {
      const imageUploads = combinedData.fileList.map((file) =>
        file.url ? Promise.resolve(file.url) : uploadFile(file.originFileObj)
      );

      const imageUrls = await Promise.all(imageUploads);
      const { category, subcategory, fileList, ...restData } = combinedData;

      const productData = {
        product: {
          productID: restData.productID,
          productName: restData.productName,
          bathStone: restData.bathStone || "",
          brand: restData.brand,
          goldType: restData.goldType || "", // Correct spelling
          goldWeight: restData.goldWeight || 0,
          shapeDiamond: restData.shapeDiamond || "",
          dimensionsDiamond: restData.dimensionsDiamond || "",
          message: restData.message || "",
          oldGold: restData.oldGold || "",
          productType: restData.productType || "",
          quantityStonesOfDiamond: restData.quantityStonesOfDiamond || 0,
          ratio: restData.ratio,
          originalPrice: restData.originalPrice,
          quantity: restData.quantity,
          wagePrice: restData.wagePrice,
          stoneWeight: restData.stoneWeight || 0,
          category: {
            categoryName: subcategory,
          },
        },
        sizes: restData.sizes,
        productImages: imageUrls.map((url) => ({
          imageUrl: url,
        })),
      };

      // Log dữ liệu trước khi gửi lên API
      console.log("Product Data:", productData);

      await createProduct(productData);
      message.success("Tạo Sản Phẩm Thành Công!");
      // Tiếp tục với onFinish
      onFinish(productData);
    } catch (error) {
      console.error("Lỗi khi xác nhận:", error);

      // Log thêm thông tin lỗi
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="button_form_2">
      <Result
        icon={<FcReadingEbook size={200} />}
        title="Kiểm tra thông tin 1 lần nữa! Trước khi bấm xác nhận"
        extra={
          <Button type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        }
      />
    </div>
  );
}

export default Confirm;
