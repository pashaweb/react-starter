import useStoreHook from '../hooks/useStoreHook';

function Home() {
  const { vulnerabilities } = useStoreHook();

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
              <button type="button">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;
