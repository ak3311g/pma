import { Link } from "react-router-dom";

export default function Header() {
  return (<>
    <div className="bg-white h-20 bg-opacity-20 flex items-center">
      <Link to="/" className="text-4xl cursor-pointer font-extrabold text-green-500 m-3">ProMA</Link>
    </div>
  </>
  );
}