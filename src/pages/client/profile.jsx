export default function Profile() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Manage My Account</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Personal Profile */}
        <div className="bg-white p-5 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Personal Profile</h2>
            <button className="text-blue-500 text-sm">EDIT</button>
          </div>
          <p className="font-medium">Yasintha</p>
          <p className="text-sm text-gray-600 mb-4">ya***************@gmail.com</p>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked readOnly className="accent-orange-500" />
              <span>Receive marketing SMS</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-orange-500" />
              <span>Receive marketing emails</span>
            </label>
          </div>
        </div>

        {/* Address Book */}
        <div className="bg-white p-5 rounded shadow-sm col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Address Book</h2>
            <button className="text-blue-500 text-sm">EDIT</button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">DEFAULT SHIPPING ADDRESS</h3>
              <p className="font-semibold">Yasintha chamikara</p>
              <p className="text-sm text-gray-700">
                40/6/B Weeraketiya Road Walasmulla<br />
                Southern - Hambantota - Walasmulla<br />
                (+94) 765865283
              </p>
            </div>

            {/* Billing Address */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">DEFAULT BILLING ADDRESS</h3>
              <p className="font-semibold">Yasintha chamikara</p>
              <p className="text-sm text-gray-700">
                40/6/B Weeraketiya Road Walasmulla<br />
                Southern - Hambantota - Walasmulla<br />
                (+94) 765865283
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
