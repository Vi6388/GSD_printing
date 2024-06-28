import React from "react";

const PriceTable = () => {
  return (
    <section className="service-details-cost-calculator sec-pad">
      <div className="thm-container">
        <div className="row">
          <div className="col-md-4">
            <div className="cost-calc-content">
              <div className="sec-title">
                <span>Postcards pricing list</span>
                <h3>Choose Pricing</h3>
              </div>
              <form action="#" className="cost-calc-form">
                <select id="select-size">
                  <option value="1">Select Size</option>
                  <option value="1">4.13" x 5.83"</option>
                  <option value="1">4" x 6"</option>
                  <option value="1">3.67" x 8.5"</option>
                </select>
                <select id="finishing-option">
                  <option value="1">Finish options</option>
                  <option value="1">Medium Postcards</option>
                  <option value="1">Rounded Postcards</option>
                  <option value="1">Small Postcards</option>
                </select>
              </form>
              <p>For more quantities and pricing visit our</p>
              <a href="#">Shipping and Cost Calculator</a>
            </div>
          </div>
          <div className="col-md-8">
            <div className="table-responsive pricing-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Price per Postcard</th>
                    <th>Pack Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="inner">25 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.84 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$21.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">50 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.74 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$37.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">100 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.55 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$55.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">250 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.36 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$90.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">500 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.27 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$135.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">1,000 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.17 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$165.00</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inner">2,500 postcards</div>
                    </td>
                    <td>
                      <div className="inner">$0.14 / postcard</div>
                    </td>
                    <td>
                      <div className="inner">$345.00</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceTable;
