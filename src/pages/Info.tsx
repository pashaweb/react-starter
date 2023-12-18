import { useParams } from 'react-router-dom';
import { useVolStore } from '../store/store';

export default function Info() {
  const { id } = useParams();
  const { vulnerabilities } = useVolStore();
  const vul = vulnerabilities.find((vul) => vul.ip === id);
  return (
    <div>
      <h2>Info IP: {vul?.ip} </h2>
      <ul>
        {vul?.vulnerabilities.map((ifo) => (
          <li key={ifo}>
            <p>{ifo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
