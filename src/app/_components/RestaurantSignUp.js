const RestaurantSignUp = () => {
    return(
        <>
        <h3>SignUP componente</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Email" className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurent Name" className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter city" className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Full Address" className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter contact No." className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password"  className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password"  className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <button className="button">Sign UP</button>
                </div>
            </div>
        </>
    );
}

export default RestaurantSignUp;

