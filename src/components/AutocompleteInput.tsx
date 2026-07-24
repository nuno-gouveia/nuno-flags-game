import { useMemo, useRef, useState } from 'react';
import type { Country } from '../data/countries';

interface AutocompleteInputProps {
  countries: Country[];
  onSubmit: (code: string) => void;
}

const MAX_SUGGESTIONS = 8;

export function AutocompleteInput({ countries, onSubmit }: AutocompleteInputProps) {
  const [query, setQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelPendingClose() {
    if (blurTimeout.current !== null) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  }

  const suggestions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return countries
      .filter((c) => c.name.toLowerCase().includes(trimmed))
      .slice(0, MAX_SUGGESTIONS);
  }, [countries, query]);

  const exactMatch = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return null;
    return countries.find((c) => c.name.toLowerCase() === trimmed) ?? null;
  }, [countries, query]);

  const resolvedCode = selectedCode ?? exactMatch?.code ?? null;

  function selectSuggestion(country: Country) {
    cancelPendingClose();
    setQuery(country.name);
    setSelectedCode(country.code);
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function handleSubmit() {
    if (!resolvedCode) return;
    onSubmit(resolvedCode);
    setQuery('');
    setSelectedCode(null);
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length === 0) return;
      setOpen(true);
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        selectSuggestion(suggestions[highlightedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="autocomplete">
      <div className="autocomplete-row">
        <input
          type="text"
          value={query}
          placeholder="Type a country name…"
          autoComplete="off"
          onChange={(e) => {
            cancelPendingClose();
            setQuery(e.target.value);
            setSelectedCode(null);
            setOpen(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            cancelPendingClose();
            setOpen(true);
          }}
          onBlur={() => {
            blurTimeout.current = setTimeout(() => setOpen(false), 150);
          }}
        />
        <button type="button" disabled={!resolvedCode} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {open && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((c, i) => (
            <li
              key={c.code}
              className={i === highlightedIndex ? 'highlighted' : ''}
              onMouseDown={() => selectSuggestion(c)}
            >
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
