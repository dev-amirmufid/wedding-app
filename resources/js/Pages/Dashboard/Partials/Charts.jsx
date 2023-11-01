import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Bisa Hadir', 'Tidak Bisa Hadir', 'Belum Membuka Undadngan'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgb(34 197 94)',
        'rgb(248 113 113)',
        'rgb(168 162 158)',
      ],
      borderColor: [
        'rgb(34 197 94)',
        'rgb(248 113 113)',
        'rgb(168 162 158)',
      ],
      borderWidth: 1,
    },
  ],
};

const Charts = () => {
  return (
    <>
      <section>
        <div className="flex">
            
            <div className="flex-1 mx-2">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">Total Undangan</h2>
                    <p className="mt-1 text-3xl text-gray-600">
                        200
                    </p>
                    <small>* jumlah undangan yang di sebar</small>
                </div>
            </div>

            <div className="flex-1 mx-2">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">Total Konfirmasi Undangan</h2>
                    <p className="mt-1 text-3xl text-gray-600">
                        200
                    </p>
                    <small>* jumlah tamu undangan terkonfirmasi hadir</small>
                </div>
            </div>

        </div>
      </section>

      <section>
        <div className="mx-2 mt-4">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <h2 className="text-lg font-medium text-gray-900">Rekap Konfirmasi Tamu Undangan</h2>
              <div className="mt-7 text-3xl text-gray-600 h-80 flex justify-center w-full">
                <Pie data={data} className="w-full"/>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Charts;
