const Table = ({ columns = [], rows = [], emptyMessage = 'No records found' }) => {
  return (
    <div className="overflow-hidden rounded-sm border border-[var(--color-border)] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead className="bg-[var(--color-background)] text-[var(--color-text-muted)]">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-[var(--color-text-muted)]" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row.id ?? index} className="border-t border-[var(--color-border)]">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 align-middle text-[var(--color-text)]">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
