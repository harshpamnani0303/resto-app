import { useState } from "react";
import './AddFooditem.css';
const AddFooditem = (props) => {
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const handleAddFooditem = async () => {
        if (!foodName || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));

        if (restaurantData) {
            resto_id = restaurantData._id;
        }

        let response = await fetch("/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name: foodName, price: price, img_path: path, description: description, resto_id })
        });

        response = await response.json();
        if (response.success) {
            alert("Food item added successfully");
            setFoodName("");
            setPrice("");
            setPath("");
            setDescription("");
            props.setAddItem(false);
        }
        else {
            alert("Error adding food item");
        }

    }
    return (
        <div className="container">
            <h1>Fooditem</h1>
            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter food name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />

                {
                    error && !foodName && <span className="input-error">Please enter food name</span>
                }
            </div>

            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                {
                    error && !price && <span className="input-error">Please enter price</span>
                }
            </div>

            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter Path" value={path} onChange={(e) => setPath(e.target.value)} />
                {
                    error && !path && <span className="input-error">Please enter path</span>
                }
            </div>

            <div className="input-wrapper">
                <input className="input-field" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                {
                    error && !description && <span className="input-error">Please enter description</span>
                }
            </div>
            <div className="input-wrapper">
                <button onClick={handleAddFooditem} className="button"> Add Food Item</button>
            </div>
        </div>
    )
}
export default AddFooditem;