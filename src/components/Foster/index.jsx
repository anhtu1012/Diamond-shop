// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import './index.scss';

const Foster = () => {
  const linkStyle = {
    color: 'white', 
    textDecoration: 'none'
  };
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className='logo' >
        <Link to="/" >
            <img  
              src='https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo-phong-trang.png?alt=media&token=f7f1e2f9-3b82-40c2-b02c-eeb19d88fb4c' 
              alt='logo' 
            />
          </Link>
        </div>
        <div className="footer-section" >
          <h2>VỀ CHÚNG TÔI</h2><br/>
          <div className="social-icons">
            <a href="/1" rel="nofollow" target="_blank" style={linkStyle}>
               Vì sao chọn Diamond
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h2>LIÊN HỆ Diamond</h2><br/>
          <p>Hotline<br/>
            CN HCM: <a href="tel:0123456780" rel="nofollow" style={linkStyle}>012 345 6780</a> (phím 1)<br />
            GÓP Ý: <a href="tel:0123456890" rel="nofollow" style={linkStyle}>012 345 6780</a> (phím 2)
          </p><br/>
          <p>Hệ Thống Showrooms<br />
            CN HCM: <a href="https://www.google.com/maps/place/VNUHCM+Student+Cultural+House/@10.8751238,106.7981485,17z/data=!3m1!4b1!4m6!3m5!1s0x3174d8a6b19d6763:0x143c54525028b2e!8m2!3d10.8751238!4d106.8007234!16s%2Fg%2F11hd1pf9gj?entry=ttu" rel="nofollow" target="_blank" style={linkStyle}>Nhà Văn Hóa Sinh Viên</a><br />
          </p>
        </div>
        <div className="footer-section">
          <h2>CHỨNG NHẬN</h2><br/>
          <div className="certificates">
            <img src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/Logo%20Bo%20cong%20thuong.png?alt=media&token=c3ce7c08-8d52-4cd6-bb64-5f88585c698b" alt="bocongthuong" />
            <img src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/DMCA.png?alt=media&token=773286c0-7445-4281-a542-113d6c2632af" alt="dmca" />
            <img src="https://firebasestorage.googleapis.com/v0/b/diamond-6401b.appspot.com/o/GIA.png?alt=media&token=fd8cb20a-4e42-4d36-9bb5-842562933cd8" alt="ISO 9001" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 <strong>Diamond</strong> All rights reserved.</p>
      </div>
    </div>
  );
};

export default Foster;
