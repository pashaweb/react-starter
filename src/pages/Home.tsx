import { Link } from 'react-router-dom';
import { useVolStore } from '../store/store';

function Home() {
  const { vulnerabilities } = useVolStore();
  return (
    <table>
      <thead>
        <tr>
          <th>IP</th>
          <th>Vulnerabilities</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vulnerabilities.map((vulnerability) => (
          <tr key={vulnerability.ip}>
            <td>{vulnerability.ip}</td>
            <td>{vulnerability.vulnerabilities.length}</td>
            <td>
              <Link to={`/info/${vulnerability.ip}`}>Info</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;
