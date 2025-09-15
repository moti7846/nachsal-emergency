import "./style/Login.css"


export default function Login() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input
          type="string"
          name="privateNumber"
          placeholder="privet number"
          value={""}
          required
          onChange={(e) => (e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={""}
          required
          onChange={(e) => (e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>

    // <div className="login">
    //   <h1>Log in</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <input
    //         type="string"
    //         name="privateNumber"
    //         placeholder="privet number"
    //         value={""}
    //         required
    //         onChange={(e) => (e.target.value)}
    //       />
    //     </div>
    //     <div>
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="password"
    //         value={""}
    //         required
    //         onChange={(e) => (e.target.value)}
    //       />
    //     </div>
    //     <button type="submit">login</button>
    //   </form>
    // </div>
  );
}
