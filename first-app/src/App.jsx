import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App({ data, rowHeight, visibleRows }) {
  const rootRef = useRef();
  const [start, setStart] = useState(0);

  function getTopHeight() {
    return rowHeight * start;
  }

  function getBottomHeight() {
    return rowHeight * (data.length - (start + visibleRows + 1));
  }

  useEffect(() => {
    const rootRefCurrent = rootRef.current;
  
    function onScroll(e) {
      setStart(Math.min(
        data.length - visibleRows - 1,
        Math.max(0, Math.floor(e.target.scrollTop / rowHeight))
      ));
    }
    rootRefCurrent.addEventListener('scroll', onScroll);
  
    return () => {
      rootRefCurrent.removeEventListener('scroll', onScroll);
    }
  }, [data.length, visibleRows, rowHeight]);

  return (
    <div style={{ height: rowHeight * visibleRows + 1, overflow: 'auto' }} ref={rootRef}>
      <div style={{ height: getTopHeight() }} />
      <table>
        <tbody>
          {data.slice(start, start + visibleRows + 1).map((row, rowIndex) => (
            <tr
              style={{ height: rowHeight }}
              key={start + rowIndex}
            >{row.map((text, colIndex) => (
              <td key={start + '' + rowIndex + colIndex}>{text}</td>
            ))}</tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: getBottomHeight() }} />
    </div>
  )
}

function makeTableData(w, h) {
  return new Array(h).fill(0).map((_, row) => {
    return new Array(w).fill(0).map((_, col) => {
      return row * 10 + col;
    });
  });
}

function AppWrapper() {
  const tableData = makeTableData(5, 10000);

  return <App data={tableData} rowHeight={40} visibleRows={3} />;
}

export default AppWrapper;