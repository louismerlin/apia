import React from 'preact'

export default ({ children }) => (
  <div style={{ maxWidth: '640px', margin: 'auto', fontFamily: 'sans-serif' }}>
    <h1 style={{ textAlign: 'center' }}>grAPIa</h1>
    {children}
  </div>
)
