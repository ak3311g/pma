import { Link } from "react-router-dom";

export default function Header() {
  return (<>
    <div className="bg-purple-400 h-20 bg-opacity-80 flex items-center m-3 rounded-md shadow-md shadow-orange-50">
      <Link to="/" className="text-4xl cursor-pointer font-extrabold text-yellow-300 m-3">ProMA</Link>
    </div>
  </>
  );
}