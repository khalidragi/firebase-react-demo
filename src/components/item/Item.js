import React from 'react';
import { useRef } from 'react';
import { useFirestore } from '../../firebase/useFirestore';
import './item.css';

const Item = ({ item }) => {
  const delBtn = useRef();
  const { deleteItem } = useFirestore();

  return (
    <div
      className="item"
      onMouseEnter={() => (delBtn.current.style.display = 'block')}
      onMouseLeave={() => (delBtn.current.style.display = 'none')}>
      <div className="item__title">
        <h3>{item.title}</h3>
      </div>
      <div className="item__info">
        <p className={item.amount >= 0 ? 'income' : 'expense'}>
          ${Math.abs(item.amount)}
        </p>
        <p>{item.date}</p>
      </div>
      <button
        className="item__delete"
        ref={delBtn}
        onClick={() => deleteItem(item.id)}>
        Delete
      </button>
    </div>
  );
};

export default Item;
