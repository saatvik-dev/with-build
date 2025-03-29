import { comparisonRows } from '@/constants/data';
import { IconSuccess, IconFail, IconWarning, IconCube, IconArrowRight } from '@/lib/icons';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <IconSuccess className="inline" />;
    case 'fail':
      return <IconFail className="inline" />;
    case 'warning':
      return <IconWarning className="inline" />;
    default:
      return null;
  }
};

const Comparison = () => {
  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-600 font-medium">SEE THE DIFFERENCE</span>
          <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold mt-2 mb-4">M-Kite vs Traditional Kitchens</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Discover why our aluminum innovation outperforms conventional kitchen materials in every aspect.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-slate-50 border-b-2 border-slate-100"></th>
                <th className="p-4 text-center bg-teal-50 border-b-2 border-teal-100 rounded-tl-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-teal-600 text-2xl mb-2"><IconCube size={24} /></span>
                    <span className="font-['Montserrat'] font-bold text-lg">M-Kite Aluminum</span>
                  </div>
                </th>
                <th className="p-4 text-center bg-slate-50 border-b-2 border-slate-100">
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-2xl mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.4a18 18 0 0 1-4.5 9.6 18 18 0 0 1-4.5 9.6"/>
                        <path d="M9 13.4a13.2 13.2 0 0 1-4.5 9.6"/>
                        <path d="M7.5 8.43a18 18 0 0 1 4.5 9.57 18 18 0 0 1 4.5 9.6"/>
                        <path d="M12 2.4a18 18 0 0 0 4.5 9.6 18 18 0 0 0 4.5 9.6"/>
                        <path d="M16.5 8.43a18 18 0 0 0-4.5 9.57 18 18 0 0 0-4.5 9.6"/>
                      </svg>
                    </span>
                    <span className="font-['Montserrat'] font-bold text-lg">Wood/Plywood</span>
                  </div>
                </th>
                <th className="p-4 text-center bg-slate-50 border-b-2 border-slate-100 rounded-tr-lg">
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-2xl mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10H4V4H20V10Z"/>
                        <path d="M4 10H20V16H4V10Z"/>
                        <path d="M4 16H20V20H4V16Z"/>
                      </svg>
                    </span>
                    <span className="font-['Montserrat'] font-bold text-lg">Steel/Metal</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={index < comparisonRows.length - 1 ? 'border-b border-slate-100' : ''}
                >
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className={`p-4 text-center bg-teal-50 ${index === comparisonRows.length - 1 ? 'rounded-bl-lg' : ''}`}>
                    {getStatusIcon(row.mkite.status)}
                    <span className="ml-2">{row.mkite.text}</span>
                  </td>
                  <td className="p-4 text-center">
                    {getStatusIcon(row.wood.status)}
                    <span className="ml-2">{row.wood.text}</span>
                  </td>
                  <td className={`p-4 text-center ${index === comparisonRows.length - 1 ? 'rounded-br-lg' : ''}`}>
                    {getStatusIcon(row.steel.status)}
                    <span className="ml-2">{row.steel.text}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 flex justify-center">
          <a href="#contact" className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md">
            Choose The Best For Your Home
            <IconArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
