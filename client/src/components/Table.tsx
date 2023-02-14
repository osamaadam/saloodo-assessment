const Table = ({
  headers,
  data,
}: {
  headers: { [key: string]: string };
  data: { [key: string]: any }[];
}) => (
  <article className="h-full w-full overflow-scroll rounded bg-gray-50 p-2">
    <table className="min-w-full">
      <thead className="border-b">
        <tr>
          {Object.values(headers).map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map((row) => (
          <tr key={row.id} className="border-b hover:bg-gray-100">
            {Object.keys(headers).map((key) => (
              <td
                key={key}
                className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
              >
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </article>
);

export default Table;
