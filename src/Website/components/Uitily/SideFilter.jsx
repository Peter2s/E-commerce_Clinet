import { Row } from "reactstrap";
import SidebarSearchHook from "../../hook/Search/SideBarSearchHook";

export const SideFilter = ({
  updateCategory,
  updatePriceFrom,
  updatePriceTo,
}) => {
  let localFrom = localStorage.getItem("priceFrom");
  let localTo = localStorage.getItem("priceTo");
  const [category, clickCategory] = SidebarSearchHook();

  const handlePriceFromChange = (event) => {
    const value = event.target.value;
    updatePriceFrom(value);
    localStorage.setItem("priceFrom", value);
  };

  const handlePriceToChange = (event) => {
    const value = event.target.value;
    updatePriceTo(value);
    localStorage.setItem("priceTo", value);
  };

  return (
    <>
      <div className="mt-3">
        <Row>
          <div className="d-flex flex-column mt-2">
            <div className="filter-title">الفئة</div>
            <div className="d-flex mt-3">
              <input onChange={clickCategory} type="checkbox" value="0" />
              <div className="filter-sub me-2 ">الكل</div>
            </div>
            {category ? (
              category.map((item, index) => {
                return (
                  <div key={index} className="d-flex mt-3">
                    <input
                      onChange={clickCategory}
                      type="checkbox"
                      value={item._id}
                    />
                    <div className="filter-sub me-2 ">{item.name_ar}</div>
                  </div>
                );
              })
            ) : (
              <h6>لا يوجد تصنيفات</h6>
            )}
          </div>

          <div className="filter-title my-3">السعر</div>
          <div className="d-flex">
            <p className="filter-sub my-2">من:</p>
            <input
              value={localFrom}
              onChange={handlePriceFromChange}
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
          <div className="d-flex">
            <p className="filter-sub my-2">الي:</p>
            <input
              onChange={handlePriceToChange}
              value={localTo}
              className="m-2 text-center"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
        </Row>
      </div>
    </>
  );
};
