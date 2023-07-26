import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label} className="w-full">
      <Link
        href={href}
        className={clsx(
          `group flex justify-center gap-x-4 p-3 text-sm leading-6 font-semibold  text-gray-400 border-r-4 border-white hover:text-blue-600  hover:border-r-4 hover:border-blue-600`,
          active && "!border-blue-600 text-blue-600"
        )}
      >
        <Icon className="h-7 w-7 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
