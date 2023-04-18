import React, { useState } from 'react';

function Hint() {
  const [showHint, setShowHint] = useState(false);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div>
      <button onClick={toggleHint}>Show Hint</button>
      {showHint && <p>This is the hint!</p>}
    </div>
  );
}

export default Hint;