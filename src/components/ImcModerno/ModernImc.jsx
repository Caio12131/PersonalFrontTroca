import React, { useState } from "react";

export default function BMIWidget() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBMI(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Abaixo do peso');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus('Peso Saúdavel');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus('Acima do peso');
    } else {
      setStatus('Obesidade');
    }
  };

  const getPointerPosition = () => {
    const minBMI = 15;
    const maxBMI = 40;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < minBMI) {
      return 0;
    } else if (bmiValue > maxBMI) {
      return 100;
    } else {
      return ((bmiValue - minBMI) / (maxBMI - minBMI)) * 100;
    }
  };

  return (
    <div className="container mx-auto mt-10 mb-20"> {/* Adicionada margem inferior */}
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <img
            alt="gear-icon"
            src="https://openui.fly.dev/openui/24x24.svg?text=⚙️"
            className="mr-2"
          />
          <h2 className="text-2xl font-semibold">Calculo IMC</h2>
        </div>
        <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">
    Altura (cm)
  </label>
  <input
    type="number"
    value={height}
    onChange={(e) => setHeight(e.target.value)}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">
    Peso (kg)
  </label>
  <input
    type="number"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

        <button
          onClick={calculateBMI}
          className="w-full bg-green-600 text-white py-3 rounded-md transition duration-200 hover:bg-blue-600"
        >
          Calular IMC
        </button>
      </div>
  
      {bmi && (
        <div className="bg-white rounded-lg p-8 shadow-lg mt-8 max-w-4xl mx-auto" style={{ border: '1px solid #D9D8D8' }}>
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <img
                alt="gear-icon"
                src="https://openui.fly.dev/openui/24x24.svg?text=⚙️"
                className="mr-2"
              />
              <h2 className="text-2xl font-semibold">IMC</h2>
            </div>
            <p className="text-gray-600 text-lg">{status}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>15</span>
                <span>18</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>40</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full flex">
                <div className="h-full bg-yellow-500 rounded-l-full" style={{ width: '22%' }}></div>
                <div className="h-full bg-green-500" style={{ width: '20%' }}></div>
                <div className="h-full bg-orange-500" style={{ width: '20%' }}></div>
                <div className="h-full bg-red-500 rounded-r-full" style={{ width: '40%' }}></div>
              </div>
              <div
                className="absolute top-[-10px] transform -translate-x-1/2"
                style={{ left: `${getPointerPosition()}%` }}
              >
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-b-orange-500 border-l-transparent border-r-transparent"></div>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-center">{bmi}</div>
        </div>
      )}
    </div>
  );
}  