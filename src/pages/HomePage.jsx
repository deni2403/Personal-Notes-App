import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import AddNoteButton from '../components/AddNoteButton';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const { locale } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || '';
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <Link to="/notes/new">
          <AddNoteButton />
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
