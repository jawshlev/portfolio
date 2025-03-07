import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import modelImage from '../assets/image.png'; // Replace with your actual image path

const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

function Home({ imageDetails }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = modelImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row center">
          <div className="image-container">
            <div
              className="thumbnail"
              style={{
                width: imageDetails.width,
                height: imageDetails.height,
              }}>
              <div className="frame">
                <Link to={`/model/yasmeen-tariq`}>
                  {imageLoaded ? (
                    <motion.img
                      src={modelImage}
                      alt="Yasmeen Tariq"
                      whileHover={{ scale: 1.1 }}
                      transition={transition}
                    />
                  ) : (
                    <div className="placeholder" style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />
                  )}
                </Link>
              </div>
            </div>
            <motion.div
              exit={{ opacity: 0 }}
              transition={transition}
              className="information">
              <div className="title">Yasmeen Tariq</div>
              <div className="location">
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;