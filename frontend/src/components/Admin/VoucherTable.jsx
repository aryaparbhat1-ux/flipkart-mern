const VoucherTable = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Voucher System</h1>

      <div className="bg-white shadow-md rounded p-5">
        <p className="mb-3">Create discount vouchers here.</p>

        <input
          type="text"
          placeholder="Voucher Code"
          className="border p-2 w-full mb-3"
        />

        <input
          type="number"
          placeholder="Discount Percentage"
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Voucher
        </button>
      </div>
    </div>
  );
};

export default VoucherTable;
