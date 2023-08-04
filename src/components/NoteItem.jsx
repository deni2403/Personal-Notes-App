import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import parser from 'html-react-parser';

function NoteItem({ id, title, createdAt, body }) {
  return (
    <article className="note-item">
      <Link to={`/notes/${id}`}>
        <h3 className="note-item__title">{title}</h3>
      </Link>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{parser(body)}</p>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
