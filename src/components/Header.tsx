import { ShoppingCart } from "lucide-react";
import leCreusetLogo from "@/assets/le-creuset-logo.jpg";

const Header = () => {
  return (
    <header className="w-full bg-card shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img 
              src={leCreusetLogo} 
              alt="Le Creuset" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-sm font-medium text-muted-foreground">
              Loyalty Program
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              August 29, 2025
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;