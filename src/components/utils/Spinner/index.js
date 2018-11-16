import React from 'react';
import './index.css';

export default function Spinner({size = 50}) {
  return <div 
    style={{width: size, height: size}}
    className="loading">
  </div>
}
