import { useEffect, useState } from "react";

const FoodItemList = () => {

    
        const [foodItems, setFoodItems] = useState([]);
        

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        const resto_id = restaurantData._id
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id)
        response = await response.json()
        if (response.success) {
            setFoodItems(response.result)
        }
        else {
            alert("Error loading food items")
        }
    }

    return (
        <div>
            <h1>Fodd Items</h1>

            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt="Pizza" /></td>
                                <td><button>Edit</button><button>Delete</button></td>
                            </tr>
                        ))
                    }
                   

                   
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList;