const RestaurantLogin = () => {
    return (
        <>
        
            <h3>Login componente</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Email" className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Password"  className="input-field"/>
                </div>
                <div className="input-wrapper">
                    <button className="button">Login</button>
                </div>
            </div>
        </>
    );
}
export default RestaurantLogin;