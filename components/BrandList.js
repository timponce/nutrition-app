import Announcer from "./Announcer";
import React from "react";
import Link from "next/link";
import brandStyles from "../styles/Brand.module.css";

const ALL_LETTERS = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function normalize(str) {
  return str.toLowerCase().replace(/['\-\s]/g, "");
}

function scoreMatch(name, search) {
  const norm = normalize(name);
  const idx = norm.indexOf(search);
  if (idx === -1) return Infinity;
  if (idx === 0) return 0;
  return idx;
}

function HighlightMatch({ text, search }) {
  if (!search) return text;

  const lower = text.toLowerCase();
  const idx = lower.indexOf(search.toLowerCase());
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + search.length)}</strong>
      {text.slice(idx + search.length)}
    </>
  );
}

const BrandList = ({ brandsData }) => {
  const [searchText, setSearchText] = React.useState("");
  const [activeLetter, setActiveLetter] = React.useState(null);

  const isSearching = searchText.length > 0;
  const normalizedSearch = normalize(searchText);

  const filteredBrands = brandsData.filter((el) => {
    if (normalizedSearch === "") return true;
    return normalize(el.name).includes(normalizedSearch);
  });

  const searchResults = isSearching
    ? [...filteredBrands].sort(
        (a, b) =>
          scoreMatch(a.name, normalizedSearch) -
          scoreMatch(b.name, normalizedSearch)
      )
    : filteredBrands;

  const grouped = {};
  for (const brand of filteredBrands) {
    const letter = brand.name[0].toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : "#";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(brand);
  }

  const availableLetters = ALL_LETTERS.filter((l) => grouped[l]);
  const displayLetter =
    activeLetter && grouped[activeLetter] ? activeLetter : null;

  return (
    <div className={brandStyles.wrapper}>
      <div className={brandStyles.content}>
        <div className={brandStyles.stickyHeader}>
          <input
            className={brandStyles.input}
            placeholder="Search restaurants..."
            onChange={(e) => {
              setSearchText(e.target.value);
              setActiveLetter(null);
            }}
            value={searchText}
          />
          {!isSearching && (
            <nav className={brandStyles.letterNav}>
              <button
                className={`${brandStyles.letterBtn} ${!displayLetter ? brandStyles.letterBtnActive : ""}`}
                onClick={() => setActiveLetter(null)}
              >
                All
              </button>
              {ALL_LETTERS.map((letter) => (
                <button
                  key={letter}
                  className={`${brandStyles.letterBtn} ${displayLetter === letter ? brandStyles.letterBtnActive : ""} ${!grouped[letter] ? brandStyles.letterBtnDisabled : ""}`}
                  onClick={() => grouped[letter] && setActiveLetter(letter)}
                  disabled={!grouped[letter]}
                >
                  {letter}
                </button>
              ))}
            </nav>
          )}
        </div>
        {isSearching ? (
          <div className={brandStyles.gridFlat}>
            {searchResults.map((brand) => (
              <Link
                key={brand.slug}
                href="/brand/[slug]"
                as={`/brand/${brand.slug}`}
              >
                <a className={brandStyles.gridItem}>
                  <HighlightMatch text={brand.name} search={searchText} />
                </a>
              </Link>
            ))}
          </div>
        ) : displayLetter ? (
          <div className={brandStyles.gridFlat}>
            {grouped[displayLetter].map((brand) => (
              <Link
                key={brand.slug}
                href="/brand/[slug]"
                as={`/brand/${brand.slug}`}
              >
                <a className={brandStyles.gridItem}>{brand.name}</a>
              </Link>
            ))}
          </div>
        ) : (
          <div className={brandStyles.grid}>
            {availableLetters.map((letter) => (
              <div key={letter} className={brandStyles.section}>
                <h3
                  className={brandStyles.sectionHeader}
                  onClick={() => setActiveLetter(letter)}
                >
                  {letter}
                </h3>
                <ul className={brandStyles.sectionList}>
                  {grouped[letter].map((brand) => (
                    <li key={brand.slug}>
                      <Link
                        href="/brand/[slug]"
                        as={`/brand/${brand.slug}`}
                      >
                        <a className={brandStyles.link}>{brand.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <Announcer
          message={`There are ${filteredBrands.length} brands to choose from.`}
        />
      </div>
    </div>
  );
};

export default BrandList;
