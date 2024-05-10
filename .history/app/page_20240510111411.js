export default function Home() {
  return (
    <main className="h-screen bg-white">
      <div className="w-screen h-full flex flex-row">
        <div className="flex-1 bg-left"></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="content-right">
            <img src="/Logo FIS.png" className="w-20 h-20 items-start" />
            <h4 className="login-title">Đăng nhập</h4>
            <p>Welcome back to FPT HRDX</p>

            <div>
              <p className="">Email</p>
              <input type="email" placeholder="Nhập Email" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
