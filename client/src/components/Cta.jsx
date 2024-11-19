import React from 'react';
import { useSelector } from 'react-redux';

const Cta = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
      <section id="cta">
        <h3>Log in or Sign up to begin</h3>
        <div>
            <button className="cta-button"><a href="/login">Log in</a></button>
            <button className="cta-button accent"><a href="/signup">Sign up</a></button>
        </div>
    </section>
  );
};

export default Cta;