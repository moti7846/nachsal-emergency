import "./Login.css"


export default function Login() {
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <>
      <main className="page">
        <div className="login">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="string"
                name="privateNumber"
                placeholder="privet number"
                value={""}
                required
                onChange={(e) => (e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={""}
                required
                onChange={(e) => (e.target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </main>
    </>
  );
}
