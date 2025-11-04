import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCards.scss";
import { getCategories } from "../../lib/api";

function CategoryCards() {
  const [categories, setCategories] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const items = await getCategories();
        setCategories(items || []);
      } catch (e) {
        console.error("Error fetching categories:", e);
        setErr("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = (link) => link && navigate(link);

  if (loading) return <div className="category-cards">Loading…</div>;
  if (err) return <div className="category-cards error">{err}</div>;

  return (
    <div className="category-cards">
      {categories.map((c, i) => (
        <div key={c.id ?? i} className="category-card" onClick={() => handleClick(c.link)}>
          <img src={c.src} alt={c.caption ?? c.title ?? "Category"} className="category-image" />
          <p className="category-caption">{c.caption ?? c.title}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;