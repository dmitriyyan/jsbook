import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import AddCell from './AddCell';
import Cell from './Cell';
import { useGetCellsQuery } from './cellsApi';
import { selectCells } from './cellsSlice';
import useCellsActions from '../../hooks/useCellsActions';

const Cells = () => {
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const { data, isSuccess, isLoading, isError } = useGetCellsQuery();

  const { addInitialCells } = useCellsActions();

  const cells = useAppSelector((state) => selectCells(state.cells));

  useEffect(() => {
    if (isSuccess) {
      addInitialCells({ cells: data });
    }
  }, [isSuccess, addInitialCells, data]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isError) {
      setIsErrorVisible(true);
      timer = setTimeout(() => {
        setIsErrorVisible(false);
      }, 5000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isError]);

  return (
    <div
      className="cell-list"
      style={{
        margin: '0 25px 50vh',
      }}
    >
      {cells.map((cell) => (
        <Cell data={cell} key={cell.id} />
      ))}

      {isLoading ? (
        <div
          style={{
            height: '100vh',
            width: '100wv',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '10%',
            paddingRight: '10%',
            animation: 'fadeIn 0.5s',
          }}
        >
          <progress className="progress is-small is-primary" max="100">
            Loading
          </progress>
        </div>
      ) : (
        <>
          <AddCell />
          {isErrorVisible && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '10%',
                paddingRight: '10%',
                animation: 'fadeIn 1s ease-in',
                color: '#ff3333',
              }}
            >
              <div>Something went wrong while fetching cells</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cells;
