import React from "react";

const PageBreadcrumb = () => {
  return (
    <section className='section-pagetop bg-light mb-5'>
      <div className='container'>
        <h2 className='title-page'>Dynamic content</h2>
        <nav>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a href='https://bootstrap-ecommerce.com/bootstrap-ecommerce-html/page-listing-grid.html#'>
                Home
              </a>
            </li>
            <li className='breadcrumb-item'>
              <a href='https://bootstrap-ecommerce.com/bootstrap-ecommerce-html/page-listing-grid.html#'>
                Best category
              </a>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Dynamic content
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default PageBreadcrumb;
