import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function NoteList({ notes }) {
  const { locale } = React.useContext(LocaleContext);
  if (!notes.length) {
    return (
      <section className="notes-list-empty">
        <p>{locale === 'id' ? 'Tidak ada catatan' : 'Note list Empty'}</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
