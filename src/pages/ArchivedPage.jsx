import React from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes } from "../utils/network-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import LocaleContext from "../contexts/LocaleContext";
import LoadingIndicator from "../components/LoadingIndicator";

function ArchivedPages() {
  const { locale } = React.useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getArchivedNotes().then(({ data }) => {
      setNotes(data);
      setIsLoading(false);
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
    <section className="archives-page">
      <h2>{locale === "id" ? "Catatan Arsip" : "Archived Note"}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {isLoading ? (
        <LoadingIndicator
          text={locale === "id" ? "Memuat catatan..." : "Loading notes..."}
        />
      ) : (
        <NoteList notes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivedPages;
