import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wrapper } from "./Wrapper";

const Header = () => {
  return (
    <header className="py-8 border-b mb-10">
      <Wrapper>
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold">Solidity Next.js Starter</h1>
          
          {/* Connect Button with updated UI */}
          <ConnectButton
            showBalance={false}
            accountStatus="address"
            label="Connect"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          />
        </div>
      </Wrapper>
    </header>
  );
};

export { Header };
