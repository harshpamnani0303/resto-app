'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditFooditem = (props) => {

    console.log(props);
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();
    const { id } = React.use(props.params); 


    useEffect(() => {
        handleLoadFoodItem();
    },[])



    const  handleLoadFoodItem= async()=> {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+id);
        response = await response.json()
        if(response.success){
            console.log(response.result);
            setFoodName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
        }
    }

    
    const handleEditFooditem = async () => {
        if (!foodName || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }


    }
    return (
        <div className="container">
            <h1>Update Fooditem</h1>
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
                <button onClick={handleEditFooditem} className="button"> Update Food Item</button>
            </div>

            <div className="input-wrapper">
                <button onClick={() => router.push('../dashboard')} className="button">Back to Food Item List </button>
            </div>
        </div>
    )
}
export default EditFooditem;