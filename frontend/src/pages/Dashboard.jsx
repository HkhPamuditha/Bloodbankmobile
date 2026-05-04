import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Users, Droplet, Calendar, Building2 } from 'lucide-react';

const DashboardCard = ({ title, count, icon: Icon, color, link }) => (
  <Link to={link || '#'} className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors cursor-pointer">
    <div className={`p-4 rounded-full ${color} text-white mr-4`}>
      <Icon className="h-8 w-8" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
    </div>
  </Link>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    donors: 0,
    appointments: 0,
    hospitals: 0,
    bloodCamps: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donorsRes, apptRes, hospRes, campsRes] = await Promise.all([
          api.get('/donors'),
          api.get('/appointments'),
          api.get('/hospitals'),
          api.get('/bloodcamps'),
        ]);

        setStats({
          donors: donorsRes.data.length,
          appointments: apptRes.data.filter(apt => apt.status === 'Pending').length,
          hospitals: hospRes.data.length,
          bloodCamps: campsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Donors" count={stats.donors} icon={Users} color="bg-blue-500" link="/donors" />
        <DashboardCard title="New Appointments" count={stats.appointments} icon={Calendar} color="bg-purple-500" link="/appointments" />
        <DashboardCard title="Total Hospitals" count={stats.hospitals} icon={Building2} color="bg-green-500" link="/hospitals" />
        <DashboardCard title="Total Blood Camps" count={stats.bloodCamps} icon={Droplet} color="bg-red-500" link="/bloodcamps" />
      </div>
    </div>
  );
};

export default Dashboard;
