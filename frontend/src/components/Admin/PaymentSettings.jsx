const PaymentSettings = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Payment Settings</h1>

      <div className="bg-white shadow-md rounded p-5">
        <input
          type="text"
          placeholder="Enter UPI ID"
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="QR Image URL"
          className="border p-2 w-full mb-3"
        />

        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Save Payment Settings
        </button>
      </div>
    </div>
  );
};

export default PaymentSettings;
