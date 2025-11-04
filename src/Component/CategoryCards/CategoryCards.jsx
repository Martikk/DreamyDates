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

  const handleClick = (link) => {
    if (!link) return;
    navigate(link);
  };

  if (loading) return <div className="category-cards">Loading…</div>;
  if (err) return <div className="category-cards error">{err}</div>;

  return (
    <div className="category-cards">
      {categories.map((category, i) => (
        <div key={category.id ?? i} className="category-card" onClick={() => handleClick(category.link)}>
          <img src={category.src} alt={category.caption ?? category.title ?? "Category"} className="category-image" />
          <p className="category-caption">{category.caption ?? category.title}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryCards;