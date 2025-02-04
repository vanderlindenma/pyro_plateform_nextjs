import { getSession, logout } from "@/actions/auth/session";
import { useState, useEffect, useRef } from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInitials, setUserInitials] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUserInitials = async () => {
      try {
        const session = await getSession();
        const username = session.user.username;
        setUsername(username);
        // Take first letter of each word in username
        const initials = username
          .split(/[\s-_]/)
          .map((word: string) => word[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
        setUserInitials(initials);
      } catch (error) {
        console.error('Error getting user initials:', error);
        setUserInitials('??');
      }
    };
    getUserInitials();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex justify-between items-center h-14 px-2 bg-primary">
      <div className="flex items-center py-2">
        <img 
          src="/logo_yellow.png" 
          alt="Pyronear Logo" 
          className="h-8"
        />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-8 h-8 rounded-full bg-white text-primary font-semibold flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          {userInitials}
        </button>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-52 bg-white flex flex-col gap-y-2 rounded-md shadow-lg">
            <div className="flex items-center px-4 pt-2">
              <div className="text-sm font-semibold text-gray-700 flex-grow text-center">
                {username}
              </div>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-500 hover:bg-gray-200 rounded-full w-4 h-4 p-3 flex items-center justify-center absolute right-2"
              >
                <div className="text-md">×</div>
              </button>
            </div>
            <form action={logout}>
              <button 
                type="submit"
                className="w-full text-left flex flex-row border-t border-gray-200 items-center gap-x-2 px-4 py-2 text-sm text-gray-700 rounded-b-md hover:bg-gray-200 transition-colors"
              >
                <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
                <div className="flex-grow text-left">Logout</div>
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

