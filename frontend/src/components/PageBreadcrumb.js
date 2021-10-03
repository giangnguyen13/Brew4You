import React from "react";
import { useHistory } from "react-router-dom";

const PageBreadcrumb = () => {
  const history = useHistory();
  const handleBackToHomePage = () => {
    history.push("/menu/all")
  }

  return (
    <section className='section-pagetop bg-light mb-5'>
      <div className='container'>
        <h2 className='title-page'>Tracking Order</h2>
        <nav>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a onClick={handleBackToHomePage} style={{color: "#89624c", cursor: "pointer", fontWeight: 500}}>
                Home
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default PageBreadcrumb;
