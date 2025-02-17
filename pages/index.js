/*
 * Frontend: React + Next.js (Leaderboard.js) with Tailwind CSS
 * Displays leaderboard data fetched from the backend with translation support, season filtering, and sorting by win %.
 */

import { useEffect, useState } from "react";
import axios from "axios";

const translations = {
  en: {
    title: "League Leaderboard",
    search: "Search players...",
    gamerName: "Gamer Name",
    league: "League",
    maps: "Maps",
    wins: "Wins",
    losses: "Losses",
    winPercentage: "Win %",
    season: "Season",
    sortByWinPercentage: "Sort by Win %",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    footer: "Made with ❤️ in the USA"
  },
  fr: {
    title: "Classement de la Ligue",
    search: "Rechercher des joueurs...",
    gamerName: "Nom du joueur",
    league: "Ligue",
    maps: "Nombre de cartes",
    wins: "Victoires",
    losses: "Défaites",
    winPercentage: "% de victoire",
    season: "Saison",
    sortByWinPercentage: "Trier par victoires",
    lightMode: "Mode Clair",
    darkMode: "Mode Sombre",
    footer: "Fait avec ❤️ aux USA"
  },
  es: {
    title: "Clasificación de la Liga",
    search: "Buscar jugadores...",
    gamerName: "Nombre del jugador",
    league: "Liga",
    maps: "Cantidad de mapas",
    wins: "Victorias",
    losses: "Derrotas",
    winPercentage: "% de victorias",
    season: "Temporada",
    sortByWinPercentage: "Ordenar por victorias",
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
    footer: "Hecho con ❤️ en los EE.UU."
  },
  ar: {
    title: "لوحة المتصدرين في الدوري",
    search: "البحث عن اللاعبين...",
    gamerName: "اسم اللاعب",
    league: "الدوري",
    maps: "عدد الخرائط",
    wins: "الانتصارات",
    losses: "الخسائر",
    winPercentage: "% الفوز",
    season: "الموسم",
    sortByWinPercentage: "الترتيب حسب الانتصارات",
    lightMode: "وضع الفاتح",
    darkMode: "وضع الداكن",
    footer: "صنع بحب ❤️ في الولايات المتحدة الأمريكية"
  }
};

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [season, setSeason] = useState("2025");
  const [sortByWinPercentage, setSortByWinPercentage] = useState(false);

  useEffect(() => {
    axios.get("https://king-prawn-app-b4hn4.ondigitalocean.app/leaderboard")
      .then(response => setPlayers(response.data))
      .catch(error => console.error("Error fetching leaderboard:", error));
  }, [season]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const sortedPlayers = sortByWinPercentage 
    ? [...players].sort((a, b) => b.win_percentage - a.win_percentage) 
    : players;

  return (
    <div className={`min-h-screen flex flex-col justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{translations[language].title}</h1>
          <div className="flex gap-4">
            <select 
              onChange={(e) => setLanguage(e.target.value)} 
              className="p-2 border rounded bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="ar">العربية</option>
            </select>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded bg-[#6B5BDE] text-white">
              {darkMode ? translations[language].lightMode : translations[language].darkMode}
            </button>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <label className="mr-2 font-semibold">{translations[language].season}:</label>
            <select onChange={(e) => setSeason(e.target.value)} className="p-2 border rounded bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <button onClick={() => setSortByWinPercentage(!sortByWinPercentage)} className="p-2 rounded bg-[#6B5BDE] text-white">
            {translations[language].sortByWinPercentage}
          </button>
        </div>
        <input 
          type="text" 
          placeholder={translations[language].search} 
          className="border p-2 w-full rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#6B5BDE] text-white">
              <th className="border p-2">{translations[language].gamerName}</th>
              <th className="border p-2">{translations[language].league}</th>
              <th className="border p-2">{translations[language].maps}</th>
              <th className="border p-2">{translations[language].wins}</th>
              <th className="border p-2">{translations[language].losses}</th>
              <th className="border p-2">{translations[language].winPercentage}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.filter(player => player.gamer_name.toLowerCase().includes(search.toLowerCase())).map((player, index) => (
              <tr key={index} className="text-center bg-white dark:bg-gray-700">
                <td className="border p-2">{player.gamer_name}</td>
                <td className="border p-2">{player.league}</td>
                <td className="border p-2">{player.maps}</td>
                <td className="border p-2">{player.wins}</td>
                <td className="border p-2">{player.losses}</td>
                <td className="border p-2">{player.win_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
