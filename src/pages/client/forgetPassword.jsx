export default function ForgetPassword() {
    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Forgot Password</h1>
            <form>
                <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>Enter your email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        marginBottom: "16px"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}
