import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import AddPopup from 'components/AddPopup';
import ColumnHeader from 'components/ColumnHeader';
import EditPopup from 'components/EditPopup';
import Task from 'components/Task';
import TaskForm from 'forms/TaskForm';
import TaskPresenter from 'presenters/TaskPresenter';
import TasksRepository from 'repositories/TasksRepository';
import useTasks from 'hooks/store/useTasks';

import useStyles from 'components/TaskBoard/useStyles';

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

const TaskBoard = () => {
  const { board, loadBoard, loadColumn, loadColumnMore } = useTasks();
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    loadBoard();
  }, []);

  useEffect(() => {
  const colIds = (board.columns || []).map((c) => c?.id);
  const missingCols = colIds.filter((id) => id == null);
  if (missingCols.length) console.warn('Columns without id:', missingCols.length);

  const dupCols = colIds.filter((id, i) => id != null && colIds.indexOf(id) !== i);
  if (dupCols.length) console.warn('Duplicate column ids:', dupCols);

  const cardIds = [];
  (board.columns || []).forEach((col) => (col.cards || []).forEach((card) => cardIds.push(card?.id)));

  const missingCards = cardIds.filter((id) => id == null);
  if (missingCards.length) console.warn('Cards without id:', missingCards.length);

  const dupCards = cardIds.filter((id, i) => id != null && cardIds.indexOf(id) !== i);
  if (dupCards.length) console.warn('Duplicate card ids:', dupCards);
}, [board]);



  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });  
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, { stateEvent: transition.event })
      .then(() => {
        loadColumn(destination.toColumnId);
        loadColumn(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`); // eslint-disable-line no-alert
      });
  };

  const handleTaskLoad = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });
  };

  const handleTaskDestroy = (task) => {
    TasksRepository.destroy(task.id).then(() => {
      loadColumn(TaskPresenter.taskState(task));
      handleClose();
    });
  };

  return (
    <>
      <Fab onClick={handleOpenAddPopup} className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => <Task onClick={handleOpenEditPopup} task={card} />}
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && <AddPopup onCardCreate={handleTaskCreate} onClose={handleClose} />}
      {mode === MODES.EDIT && (
        <EditPopup
          onCardLoad={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
    </>
  );
};

export default TaskBoard;