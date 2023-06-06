import Tables from '../../../SharedUI/Table/Tables';

const Producttablecontent=[
    {
    id:15,
    name:"noor",
  }
  ];
  
const Products = (Productdatails) => {
    return (
        <>
            <Tables title="Products Table" 
            trContent='
            <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
                <th scope="col" />'

            tableContent={Producttablecontent}
            
            
            />
        </>
    )
}

export default Products;