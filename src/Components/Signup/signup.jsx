import './signup.css';

function signup() {
    return (
        <>
            <div className="signupmain">
                <h2>Register</h2>
                <div className="signupinputs">
                    <label>Name:</label>
                    <input type="text" name="" id="" />
                    <label>Email:</label>
                    <input type="text" name="" id="" />
                    <label>User Name:</label>
                    <input type="text" name="" id="" />
                    <label>Password:</label>
                    <input type="text" name="" id="" />
                    <label>Reenter Password:</label>
                    <input type="text" name="" id="" />
                </div>
                <div className="signupbtn">
                    <button>Register</button>
                </div>
                <div className="signuplink">
                    <span>Already have a Account Login. </span>
                </div>
            </div>
        </>
    )
}

export default signup
