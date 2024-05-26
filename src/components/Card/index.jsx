import { Card } from 'antd';
const { Meta } = Card;

const CardIndex = () => (
    //Dùng để lấy dữ liệu từ api
//   const [cardData, setCardData] = useState({ title: '', description: '', imgUrl: '' });

//   useEffect(() => {
//     // Replace this URL with the actual API endpoint
//     const apiUrl = 'https://api.example.com/card-data';

//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         setCardData({
//           title: data.title,
//           description: data.description,
//           imgUrl: data.imgUrl,
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching card data:', error);
//       });
//   }, []);

//   return (
//     <Card
//       hoverable
//       style={{ width: 220 }}
//       cover={<img alt="example" src={cardData.imgUrl} />}
//     >
//       <Meta title={cardData.title} description={cardData.description} />
//     </Card>
//   );

<Card
      hoverable
      style={{
        width: 220,
      }}
      cover={<img alt="example" src="https://jemmia.vn/wp-content/uploads/2024/05/kim-cuong-vien.png" />}
    >
      <Meta
        title="Kim cương 18k"
        description={<span style={{ color: 'red' }}>123,456,789vnd</span>}
      />
    </Card>
);

export default CardIndex;
