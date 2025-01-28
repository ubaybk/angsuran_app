import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [otr, setOtr] = useState("");
  const [dpPercentage, setDpPercentage] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState("");
  const [angsuran, setAngsuran] = useState(null);

  const getBungaTahunan = (jangkaWaktu) => {
    if (jangkaWaktu <= 12) return 0.12; // 12%
    if (jangkaWaktu <= 24) return 0.14; // 14%
    return 0.165; // 16.5%
  };

  const calculateAngsuran = () => {
    if (!otr || !dpPercentage || !jangkaWaktu) {
      toast.error("Mohon isi semua field");
      return;
    }

    const dpAmount = (otr * dpPercentage) / 100;
    const pokok = otr - dpAmount;
    const jangkaWaktuBulan = jangkaWaktu;
    const bungaTahunan = getBungaTahunan(jangkaWaktuBulan);
    const totalBunga = pokok * bungaTahunan;

    // Rumus baru: (pokok + (pokok * bunga)) / jangka waktu
    const angsuranPerBulan = (pokok + totalBunga) / jangkaWaktuBulan;

    setAngsuran(angsuranPerBulan);
    toast.success(`Perhitungan berhasil`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <div className="min-h-screen p-5 relative flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute bottom-5 right-5">
        <h1 className="font-bold italic text-gray-700 text-[20px]">
          Bayu Kurniawan
        </h1>
      </div>
      <h1 className="text-center font-bold text-4xl md:text-[50px] text-blue-600 mb-10">
        HITUNG ANGSURAN
      </h1>
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <h2 className="w-32 text-right text-gray-700 font-medium">OTR :</h2>
            <input
              placeholder="Masukkan OTR"
              type="number"
              value={otr}
              onChange={(e) => setOtr(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="w-32 text-right text-gray-700 font-medium">
              DP (%) :
            </h2>
            <input
              placeholder="Masukkan DP"
              type="number"
              value={dpPercentage}
              onChange={(e) => setDpPercentage(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="w-32 text-right text-gray-700 font-medium">
              Jangka Waktu :
            </h2>
            <input
              placeholder="Jangka Waktu (bulan)"
              type="number"
              value={jangkaWaktu}
              onChange={(e) => setJangkaWaktu(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
            />
          </div>
          <button
            onClick={calculateAngsuran}
            className="mt-4 w-full bg-blue-600 py-5 rounded-lg text-white hover:bg-blue-700"
          >
            Hitung Angsuran
          </button>
          <ToastContainer />
          {angsuran !== null && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-center text-gray-700 font-medium mb-2">
                Angsuran per Bulan
              </h3>
              <p className="text-center text-2xl font-bold text-blue-600">
                {formatCurrency(angsuran.toString())}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
