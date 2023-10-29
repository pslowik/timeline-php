import React, { useState } from 'react';

const Lekarz = ({src, alt, description}) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="person-image"
         onMouseEnter={() => setShowDescription(true)}
         onMouseLeave={() => setShowDescription(false)}>
      <div className="image-container">
        <img src={src} alt={alt} />
        {showDescription 
          && 
        <div className="description">{description}</div>}
      </div>
    </div>

  );
};

export default Lekarz;




