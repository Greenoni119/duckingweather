"use client";
import SearchIcon from "@mui/icons-material/Search";

interface InputProps {
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ handleSearch, setLocation }: InputProps) => {
  return (
    <form className=" flex items-center md:w-1/4 w-full order-2 md:order-1">
      <input
        type="text"
        className="w-full rounded-sm p-1 outline-none subtext bg-transparent border border-orange-100 "
        placeholder="Enter city, zip..."
        onKeyDown={handleSearch}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="ml-[-25px] subtext cursor-pointer">
        <SearchIcon />
      </div>
    </form>
  );
};

export default Input;
