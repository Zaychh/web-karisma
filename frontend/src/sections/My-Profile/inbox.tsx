import Cat from "../../assets/cat.png";

const Inbox = () => {
    return (
      <div className="flex min-h-screen bg-ashh text-white font-poppins">
        {/* Spacer untuk sidebar (karena pakai fixed) */}
        <div className="w-20" />
        
        <div className="flex-1 py-10 px-8">
          <h1 className="text-4xl font-bold mb-10">Inbox</h1>

          <div className="bg-white text-black border border-white rounded-2xl p-8 max-w-4xl">
            <div className="flex flex-col items-center gap-y-4">
              <img
                src={Cat}
                alt="No notifications"
                style={{ width: "280px", height: "280px" }}
                className=""
              />
              <p className="text-xl font-semibold text-center">
                Tidak ada notifikasi!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};
export default Inbox;